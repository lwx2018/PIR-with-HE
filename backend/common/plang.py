from lark import Lark, Visitor, Transformer, Token, v_args
from .plang_code import PlangCode

plang_grammar = """
    start: input output
    input: "INPUT:" input_item ("," input_item)*
    input_item: NAME                -> input_var
    output: "OUTPUT:" expression    -> output
    ?expression: product
        | expression "+" product    -> add
        | expression "-" product    -> sub
    ?product: atom
        | product "*" atom          -> mul
        | product "/" atom          -> div
    ?atom: SIGN_NUMBER              -> number
        | NAME                      -> var
        | func
        | "(" expression ")"
    ?func: "SUM" "(" func_args ")"  -> sum
        | "AVG" "(" func_args ")"   -> avg
    ?func_args: NAME                -> var
        | SIGN_NUMBER               -> number

    SIGN_NUMBER: "-"?NUMBER

    %import common.CNAME -> NAME
    %import common.NUMBER
    %import common.WS
    %ignore WS
"""

counter = 0

def newVar():
    global counter
    counter += 1
    return "_var_" + str(counter)

@v_args(inline=True)
class ProcessTree(Transformer):
    def __init__(self, visit_tokens: bool = True) -> None:
        super().__init__(visit_tokens)

class VisitTree(Visitor):
    def __init__(self) -> None:
        super().__init__()
        self.vars = set()
        self.code = PlangCode()

    def input_var(self, tree):
        self.code.addInput(tree.children[0].value)

    def output(self, tree):
        child = tree.children[0]
        assert(child.data == '_var_')
        self.code.setOutput(child.children[0].value)
    
    def add(self, tree):
        v = newVar()
        left = tree.children[0]
        right = tree.children[1]
        if (left.data == 'number' and right.data == 'number'):
            tree.data = 'number'
            tree.children = [Token('number', value = left.children[0].value + ' + ' + right.children[0].value)]
        else:
            instruction = v + ' = ' + left.children[0].value + ' + ' + right.children[0].value
            self.code.addInstruction(instruction)
            tree.data = '_var_'
            tree.children = [Token('_var_', value = v)]
    
    def sub(self, tree):
        v = newVar()
        left = tree.children[0]
        right = tree.children[1]
        if (left.data == 'number' and right.data == 'number'):
            tree.data = 'number'
            tree.children = [Token('number', value = left.children[0].value + ' - ' + right.children[0].value)]
        else:
            instruction = v + ' = ' + left.children[0].value + ' - ' + right.children[0].value
            self.code.addInstruction(instruction)
            tree.data = '_var_'
            tree.children = [Token('_var_', value = v)]
    
    def mul(self, tree):
        v = newVar()
        left = tree.children[0]
        right = tree.children[1]
        if (left.data == 'number' and right.data == 'number'):
            tree.data = 'number'
            tree.children = [Token('number', value = left.children[0].value + ' * ' + right.children[0].value)]
        else:
            instruction = v + ' = ' + left.children[0].value + ' * ' + right.children[0].value
            self.code.addInstruction(instruction)
            tree.data = '_var_'
            tree.children = [Token('_var_', value = v)]
    
    def div(self, tree):
        v = newVar()
        left = tree.children[0]
        right = tree.children[1]
        if (left.data == 'number' and right.data == 'number'):
            tree.data = 'number'
            tree.children = [Token('number', value = left.children[0].value + ' / (' + right.children[0].value + ')')]
        else:
            if (right.data == 'number'):
                instruction = v + ' = ' + left.children[0].value + ' * (1.0 / (' + right.children[0].value + '))'
            else:
                self.code.setFormat('tee')
                instruction = v + ' = ' + left.children[0].value + ' / ' + right.children[0].value
            self.code.addInstruction(instruction)
            tree.data = '_var_'
            tree.children = [Token('_var_', value = v)]
    
    def sum(self, tree):
        v = newVar()
        child = tree.children[0]
        assert(child.data == 'var')
        instruction = v + ' = sum(' + child.children[0].value + ')'
        self.code.addInstruction(instruction)
        tree.data = '_var_'
        tree.children = [Token('_var_', value = v)]
    
    def avg(self, tree):
        v = newVar()
        child = tree.children[0]
        assert(child.data == 'var')
        instruction = v + ' = avg(' + child.children[0].value + ')'
        self.code.addInstruction(instruction)
        tree.data = '_var_'
        tree.children = [Token('_var_', value = v)]

plang_parser = Lark(plang_grammar, parser='lalr', transformer=ProcessTree())

class PLangProgram:
    def __init__(self, code):
        self.code = code
        self.parse_tree = plang_parser.parse(code)
    
    def tree(self):
        return self.parse_tree.pretty()
    
    def compile(self):
        visitor = VisitTree()
        visitor.visit(self.parse_tree)
        compiled_code = visitor.code.generate()
        compiled_format = visitor.code.format
        compiled_inputs = visitor.code.inputs
        return compiled_code, compiled_format, compiled_inputs
    
    def compile_and_save(self, file_name):
        compiled_code, compiled_format, compiled_inputs = self.compile()
        with open(file_name + '.py', 'w') as f:
            f.write(compiled_code)
        with open(file_name + '.fmt', 'w') as f:
            f.write(compiled_format)
        with open(file_name + '.in', 'w') as f:
            f.writelines([input.name + '\n' for input in compiled_inputs])
        return compiled_code, compiled_format

if __name__ == '__main__':
    plang_program = PLangProgram("""
    INPUT: A
    OUTPUT: A/(1/10)
    """)

    plang_program.compile_and_save('compiled')
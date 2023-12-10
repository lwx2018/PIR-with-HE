from jinja2 import Environment, FileSystemLoader
import os

class Input:
    def __init__(self, name):
        self.name = name

class PlangCode:
    def __init__(self):
        self.format = 'eva'
        self.inputs = []
        self.instructions = []
        self.output = None
    
    def setFormat(self, format):
        self.format = format

    def addInput(self, name):
        self.inputs.append(Input(name))
    
    def addInstruction(self, instruction):
        self.instructions.append(instruction)
    
    def setOutput(self, output):
        self.output = output
    
    def generate(self):
        file_loader = FileSystemLoader(os.path.dirname(__file__) + '/templates')
        env = Environment(loader=file_loader)
        template = env.get_template(self.format + '_program.jinja')
        return template.render(program=self)

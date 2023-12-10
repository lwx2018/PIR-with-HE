(async () => {
  // Pick one for your environment
  // npm install node-seal
  // yarn add node-seal
  //
  // ES6 or CommonJS
  // import SEAL from 'node-seal'
  const SEAL = require('node-seal/allows_js_node_umd')
  
  // Wait for the web assembly to fully initialize
  const seal = await SEAL()
  
  ////////////////////////
  // Encryption Parameters
  ////////////////////////
  
  // Create a new EncryptionParameters
  const schemeType = seal.SchemeType.ckks
  const securityLevel = seal.SecurityLevel.tc128
  const polyModulusDegree = 4096
  const bitSizes = [46,16,46]
  
  const encParms = seal.EncryptionParameters(schemeType)

  // Assign Poly Modulus Degree
  encParms.setPolyModulusDegree(polyModulusDegree)
  
  // Create a suitable set of CoeffModulus primes
  encParms.setCoeffModulus(
    seal.CoeffModulus.Create(
      polyModulusDegree,
      Int32Array.from(bitSizes)
    )
  )

  ////////////////////////
  // Context
  ////////////////////////
  
  // Create a new Context
  const context = seal.Context(
    encParms,
    true,
    securityLevel
  )

  // Helper to check if the Context was created successfully
  if (!context.parametersSet()) {
    throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.')
  }

  ////////////////////////
  // Keys
  ////////////////////////
  
  // Create a new KeyGenerator (use uploaded keys if applicable)
  const keyGenerator = seal.KeyGenerator(
    context
  )

  // Get the SecretKey from the keyGenerator
  const Secret_key_Keypair_A_ = keyGenerator.secretKey()

  // Get the PublicKey from the keyGenerator
  const Public_key_Keypair_A_ = keyGenerator.createPublicKey()

  // Create a new RelinKey
  const Relin_key_Keypair_A_ = keyGenerator.createRelinKeys()

  // Create a new GaloisKey
  const Galois_key_Keypair_A_ = keyGenerator.createGaloisKeys()

  ////////////////////////
  // Variables
  ////////////////////////
  
  // Create the PlainText(s) 
  const Plain_A = seal.PlainText()
const pB = seal.PlainText()

  // Create the CipherText(s) 
  const Cipher_A = seal.CipherText()
const cB = seal.CipherText()

  ////////////////////////
  // Instances
  ////////////////////////
  
  // Create an Evaluator
  const evaluator = seal.Evaluator(context)

  // Create a CkksEncoder (only ckks SchemeType)
  const ckksEncoder = seal.CKKSEncoder(context)

  // Create an Encryptor
  const encryptor = seal.Encryptor(
    context,
    Public_key_Keypair_A_
  )

  // Create a Decryptor
  const decryptor = seal.Decryptor(
    context,
    Secret_key_Keypair_A_
  )

  ////////////////////////
  // Homomorphic Functions
  ////////////////////////
  
  // Encode data to a PlainText
  ckksEncoder.encode(
    Float64Array.from([1]),
    Math.pow(2, 16),
    Plain_A
  )
  
  // Encrypt a PlainText
  encryptor.encrypt(
    Plain_A,
    Cipher_A
  )    
  
  // Add CipherText B to CipherText A and store the sum in a destination CipherText
  evaluator.add(
    Cipher_A,
    Cipher_A,
    cB
  )    
  
  // Decrypt a CipherText
  decryptor.decrypt(
    cB,
    pB
  )    
  
  // Decode data from a PlainText
  const decoded_pB = ckksEncoder.decode(
    pB,
  )
  
  console.log('decoded', decoded_pB )
  
})()

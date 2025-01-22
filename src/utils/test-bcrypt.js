const bcrypt = require('bcrypt')

const testBcrypt = async () => {
  const testPassword = 'errorerror'
  //encript
  const hash = await bcrypt.hash(testPassword, 10)
  console.log('generated hash : hash')

  const isMatch = await bcrypt.compare(testPassword, hash)
  console.log('Check:', isMatch) // that should be true
}

testBcrypt()

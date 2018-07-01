def getEnvForSuite(suiteName) {
  // Base environment variables
  def envVars = [
    "NVM_DIR=${env.HOME}/.nvm"
  ]

  // Add test suite specific environment variables
  // switch(suiteName) {
  //   case 'test':
  //     envVars.add("NOCK_OFF=true")
  //     break
  //   default:
  //     error("Unknown test suite environment ${suiteName}")
  // }

  return envVars
}

def setupNodeAndTest() {
  // get version
  sh 'ls -al'
  sh 'echo $NVM_DIR'
  sh 'ls $NVM_DIR'
  String version = readFile('.nvmrc')

  // Install NVM
  sh 'wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash'

  // Run tests using creds
  withEnv(getEnvForSuite("${testSuite}")) {
    // Actions:
    //  1. Load NVM
    //  2. Install/use required Node.js version
    //  3. Install mocha-jenkins-reporter so that we can get junit style output
    //  4. Run tests
    sh """
      echo 'Grabbing nvm...'
      echo '------------------ nvm ---------------------'
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
      nvm install ${version}
      nvm use ${version}

      echo 'Installing dependencies...'
      echo '------------------ install ---------------------'
      yarn

      echo 'Testing...'
      echo '------------------ test ---------------------'
      yarn test
    """
  }
}

pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        setupNodeAndTest();
      }
    }
  }
}
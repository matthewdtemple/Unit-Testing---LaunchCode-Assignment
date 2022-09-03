class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let commands = message.commands
    let responseArray = []
    let commandObj = {
      completed: true
    }
     let moveObj = {
      completed: true
    }
    
    let statusCheckReponse = { 
      roverStatus:{
        mode: this.mode,
        generatorWatts: this.generatorWatts,
        position: this.position
      } 
    } 
    
    for (let i = 0; i < commands.length; i++){
      if (commands[i].commandType === 'STATUS_CHECK'){
        responseArray.push(statusCheckReponse)
        
      }else if(commands[i].commandType === 'MODE_CHANGE'){
          if(commands[i].value === 'NORMAL') {
            this.mode = commands[i].value
          }else if (commands[i].value === 'LOW_POWER'){
            this.mode = commands[i].value
          } responseArray.push(commandObj)

        
      }else if(commands[i].commandType === 'MOVE'){
        if (this.mode === 'NORMAL'){
          this.position = commands[i].value
        } else if (this.mode === "LOW_POWER"){
          moveObj.completed = false
        } 
        responseArray.push(moveObj)
      }
      
    }
    let response = {
      messageName: message.name,
      results: responseArray,
    }
    return response
  }
}



module.exports = Rover;

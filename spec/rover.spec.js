const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
const assert = require("assert")
// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let message = new Rover(1000)
    expect(message.position).toEqual(1000)
    expect(message.generatorWatts).toEqual(110)
    expect(message.mode).toEqual('NORMAL')
  })

  it("response returned by receiveMessage contains name of message", function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
    expect(message.name).toEqual(answer.messageName)

  })

   it("response returned by receiveMessage contains two commands if two commands are sent", function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
    expect(commands.length).toEqual(answer.results.length)
  })

    it("responds correctly to status check command", function(){
let commands = [new Command('STATUS_CHECK')];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
let roverResults = {
  roverStatus:{
        mode: rover.mode, 
        generatorWatts: rover.generatorWatts, 
        position: rover.position
    }}
expect(roverResults).toEqual(answer.results[0]);
  })

     it("responds correctly to mode change command", function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
    expect('LOW_POWER').toEqual(rover.mode);
    expect({completed: true}).toEqual(answer.results[0])
    
  })

 it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10000)];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
    expect({completed: false}).toEqual(answer.results[1])
    
  })

   it("responds with position for move command", function(){
let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 123456)];
let message = new Message('Test message', commands);
let rover = new Rover(100);    
let answer = rover.receiveMessage(message);
    expect(123456).toEqual(rover.position)
  })
})


const Message = require('../message.js');
const Command = require('../command.js');
const assert = require('assert')



describe("Message class", function() {

  it("throws an error if name isn't give", function(){
    expect(function(){ new Message()}).toThrow(new Error("Name required."))
  })

  it("constrcutor sets name", function(){
    let message = new Message("NAME");
    assert.strictEqual(message.name, 'NAME')
  })

  it("contains a commands array passed into the constructor as 2nd argument", function (){
    let commands = [new Command("command1", 1), new Command("command2",2)];
    let message = new Message("ComMessage", commands);
    assert.strictEqual(message.commands, commands)
  })

});

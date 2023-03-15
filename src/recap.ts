const myName = 'Luis Daniel';

myName.split(' ');

const suma = (a: number, b: number) => a + b;
suma(1, 2);

class Persona {
  constructor(private name: string, private age: number) {}

  getSummary() {
    return `Mi nombre es ${this.name} y tengo ${this.age} años`;
  }
}

const luis = new Persona('Luis Daniel', 33);
luis.getSummary();

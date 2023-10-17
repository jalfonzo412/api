import request from 'supertest';
import app from '../app.js';

async function createAnimalAndGet() {
  const newAnimal = {
    grupo: 'Mamífero',
    especie: 'Perro',
    raza: 'Chihuahua',
    anios: 3,
    peso_aprox: 2.1,
    cantidad: 5,
    valor_x_unidad: 5
  };

  const createResponse = await request(app).post('/api/animals').send(newAnimal);

  return createResponse;
}

describe('GET /api/animals', () => {
  let server;
  
  beforeAll(async () => {
    server = await request(app);
  });

  test('should respond with a 200 status code', async () => {
    const response = await server.get('/api/animals').send();
    expect(response.statusCode).toBe(200);
  });
  
  test('should respond with an array', async () => {
    const response = await server.get('/api/animals').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/animals/:id', () => {
  describe('given an existing animal id', () => {
    let server;
    let animal;
    
    beforeAll(async () => {
      server = await request(app);
      animal = await createAnimalAndGet();
    });

    afterAll(async () => {
      await server.delete(`/api/animals/${animal.body.id}`).send();
    });

    test('should respond with a 200 status code', async () => {
      const response = await server.get(`/api/animals/${animal.body.id}`).send();
      expect(response.statusCode).toBe(200);
    });
    
    test('should respond with an object', async () => {
      const response = await server.get(`/api/animals/${animal.body.id}`).send();
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('when the animal id does not exist', () => {
    const nonExistentID = 'nonexistentid';
    
    test('should respond with a 404 status code', async () => {
      const response = await request(app).get(`/api/animals/${nonExistentID}`).send();
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('POST /api/animals', () => {
  describe('given the properties of the record', () => {
    test('should respond with a 201 status code', async () => {
      const response = await createAnimalAndGet();
      expect(response.statusCode).toBe(201);
    });

    test('should have a content-type: aplication/json in header', async () => {
      const response = await createAnimalAndGet();
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('should respond with an animal ID', async () => {
      const response = await createAnimalAndGet();
      expect(response.body.id).toBeDefined();
    });
  });

  describe('when group and species are missing', () => {
    test('should respond with a 400 status code', async () => {
      const fields = [
        { especie: 'Perro', raza: 'Chihuahua', anios: 3, peso_aprox: 2.1, cantidad: 5, valor_x_unidad: 5 },
        { grupo: 'Mamifero', raza: 'Chihuahua', anios: 3, peso_aprox: 2.1, cantidad: 5, valor_x_unidad: 5 },
        { raza: 'Chihuahua', anios: 3, peso_aprox: 2.1, cantidad: 5, valor_x_unidad: 5 }
      ];

      for (const body of fields) {
        const response = await request(app).post('/api/animals').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe('when any of the properties of the record are missing', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).post('/api/animals').send({});
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('PUT /api/animals/:id', () => {
  describe('given an existing animal id', () => {
    const updatedAnimal = {
      grupo: 'Mamífero',
      especie: 'Perro',
      raza: 'Labrador',
      anios: 5,
      peso_aprox: 25,
      cantidad: 1,
      valor_x_unidad: 10
    };
    
    let server;
    let animal;
    beforeAll(async () => {
      server = await request(app);
      animal = await createAnimalAndGet();
    });

    afterAll(async () => {
      await server.delete(`/api/animals/${animal.body.id}`).send();
    });

    test('should respond with a 200 status code', async () => {
      const response = await server.patch(`/api/animals/${animal.body.id}`).send(updatedAnimal);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('when the animal id does not exist', () => {
    const nonExistentID = 'nonexistentid';
    
    test('should respond with a 404 status code', async () => {
      const updatedAnimal = {
        grupo: 'Mamífero',
        especie: 'Perro',
        raza: 'Labrador',
        anios: 5,
        peso_aprox: 25,
        cantidad: 1,
        valor_x_unidad: 10
      };

      const response = await request(app).patch(`/api/animals/${nonExistentID}`).send(updatedAnimal);
      
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('DELETE /api/animals/:id', () => {
  describe('given an existing animal id', () => {
    let server;
    let animal;
    
    beforeAll(async () => {
      server = await request(app);
      animal = await createAnimalAndGet();
    });

    test('should respond with a 204 status code', async () => {
      const response = await server.delete(`/api/animals/${animal.body.id}`).send();
      expect(response.statusCode).toBe(204);
    });

    test('should remove the animal from the database', async () => {
      const response = await server.get(`/api/animals/${animal.body.id}`).send();
      expect(response.statusCode).toBe(404);
    });
  });

  describe('when the animal id does not exist', () => {
    const nonExistentID = 'nonexistentid';
    
    test('should respond with a 404 status code', async () => {
      const response = await request(app).delete(`/api/animals/${nonExistentID}`).send();
      expect(response.statusCode).toBe(404);
    });
  });
});
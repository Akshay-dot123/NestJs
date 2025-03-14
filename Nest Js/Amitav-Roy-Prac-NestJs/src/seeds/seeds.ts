import { Seeder, Factory } from 'typeorm-seeding';
// import dataSource from 'db/data-source'; // Re-use the connection options

export default class CreateUserSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // Initialize the dataSource connection for seeding
    // if (!dataSource.isInitialized) {
    //   await dataSource
    //     .initialize()
    //     .then(() => console.log('DataSource initialized for seeding'))
    //     .catch((err) => console.error('Error initializing DataSource:', err));
    // }
    console.log('asd');
  }
}

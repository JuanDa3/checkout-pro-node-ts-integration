import app from './app';
import * as dotenv from 'dotenv';
require('dotenv').config();
dotenv.config();

async function main() {
    try{
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        }
        );
    }catch (error) {
        if (error instanceof Error) {
            console.error(`Error starting server: ${error.message}`);
        }
    }
}

main();
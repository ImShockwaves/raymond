import axios from 'axios';
import * as config from '../../config.json';

const client = axios.create({
  baseURL: config.nookipedia_api,
  headers: {
    "X-API-KEY": process.env.nookipedia_key
  }
})

export class Villager_route {
  getVillager(villager: string): Promise<any> {
    return new Promise((resolve, reject) => {
      client.get('/villagers', { 
        params: { 
          name: villager,
          nhdetails: true
        }
      }).then(response => {
        console.log('Villager retrieved from nookipedia api:', response.status);
        resolve(response.data[0]);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
  }
}
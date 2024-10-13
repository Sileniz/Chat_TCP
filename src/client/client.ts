import { Socket } from "net";
import * as readline from 'readline'
import crypto from 'crypto'
import 'dotenv/config'

class Client{
    private client: Socket
    private rl: readline.Interface
    private algorithm: string
    private key: Buffer
    private IV: Buffer

    constructor(){
        if(!process.env.KEY || !process.env.IV){
            throw new Error
        }
        this.algorithm = 'aes-256-cbc'
        this.key = Buffer.from(process.env.KEY, 'hex')
        this.IV = Buffer.from(process.env.IV, 'hex') 
        this.client = new Socket()
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.handleSocket()
    }
    private encrypt(message: string){
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.IV)
            let encryptData = cipher.update(message, 'utf-8', 'hex')
            encryptData += cipher.final('hex')
            return encryptData      
    }
    public handleSocket(): void {
        this.client.on('data', (data) => {
            console.log(`${data}`)
        })
    }
    public connectSocket(): void {
        this.client.connect(3000, 'localhost', () => {
            console.log('Conected to server')
            this.rl.question('Type your username: ', (username) => {
                this.client.write(`username: ${username}\n`) 
                this.sendMessage()
            })
        })
    }
    
    public sendMessage(): void {
        this.rl.on('line', (input) => {
            const encryptMessage = this.encrypt(input)
            this.client.write(encryptMessage)
        })
    }
}
const client = new Client().connectSocket()
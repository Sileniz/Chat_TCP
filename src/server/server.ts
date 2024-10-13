import { createServer, Server as NetServer, Socket } from 'net'
import crypto from 'crypto'
import 'dotenv/config'

class Server {
    private server: NetServer
    private clients: Map<Socket, string>
    private algorithm: string
    private key: Buffer
    private IV: Buffer

    constructor() {
        if(!process.env.KEY || !process.env.IV){
            throw new Error
        }
        this.algorithm = 'aes-256-cbc'
        this.key = Buffer.from(process.env.KEY, 'hex')
        this.IV = Buffer.from(process.env.IV, 'hex') 
        this.server = createServer()
        this.clients = new Map()
        this.handleSockets()
    }
    private decrypt(message: string): string{
            const cipher = crypto.createDecipheriv(this.algorithm, this.key, this.IV)
            let decryptData = cipher.update(message, 'hex', 'utf-8')
            decryptData += cipher.final('utf-8')
            return decryptData        
    }
    private broadcasting(message: string, senderSocket: Socket): void {
            for(const client of this.clients.keys()){
                if(client !== senderSocket){
                    client.write(`${message}`)
                }
            }
    }
    private handleMessages(message: string, senderSocket: Socket): void {
        const senderName = this.clients.get(senderSocket)
        if(senderName){
            for(const client of this.clients.keys()){
                if(client !== senderSocket){
                    client.write(`${senderName}: ${message}`)
                }
            }
        }
    }
    
    public handleSockets(): void {
        this.server.on('connection', (socket: Socket) => {
            console.log(`Client connected`)
            socket.once('data', async (data) => {
                let name = data.toString().trim().split(" ").slice(1)?.toString()
                this.clients.set(socket, name)
                socket.write(`Welcome, ${name}!\n`)  
                console.log(`${name} has joined.`)
            })
            socket.on('data', (data) => {
                const message = data.toString().trim()
                if(message.includes('username: ')) return;
                const decryptMessage = this.decrypt(message)
                this.handleMessages(decryptMessage, socket)
                
            })
            socket.on('end', () => {
                const name = this.clients.get(socket)
                console.log(`${name} disconected`)
                this.broadcasting(`${name} has left the chat`, socket)
            })
    })
    }
    public initServer(): void {
        this.server.listen(3000, () => console.log('Server is running'))
    }
}
const server = new Server().initServer()
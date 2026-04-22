    export function getRandomIndex (max: number){
        const seed = process.env.SEED ? Number(process.env.SEED) : Date.now()
        console.log("Seed: ", seed)
        const x = Math.sin(seed)*10000
        return Math.floor((x - Math.floor(x)) * max)
    }
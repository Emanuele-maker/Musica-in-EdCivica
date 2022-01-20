function printAt(context, text, x, y, lineHeight, fitWidth)
{
    fitWidth = fitWidth || 0
    
    if (fitWidth <= 0)
    {
        context.fillText(text, x, y)
        return
    }
    
    for (var idx = 1; idx <= text.length; idx++)
    {
        var str = text.substr(0, idx)
        if (context.measureText(str).width > fitWidth)
        {
            context.fillText( text.substr(0, idx - 1), x, y)
            printAt(context, text.substr(idx - 1), x, y + lineHeight, lineHeight,  fitWidth)
            return
        }
    }
    context.fillText(text, x, y)
}

export default class DialogeBox {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.scale = {
            width: this.gameWidth - (this.gameWidth / 25),
            height: 300
        }
        this.position = {
            x: this.gameWidth / 2 - this.scale.width / 2,
            y: this.gameHeight - this.scale.height - 20
        }
        this.color = "white"
        this.active = true
        this.count = 0
        this.msgCount = 0
        this.dialog1 = [
            {
                name: "Roberta", 
                msg: "Ciao, sono Roberta e ti farò da guida nel mondo della musica e ti spiegherò perchè è importante nella nostra società!"
            },
            {
                name: "Roberta",
                msg: "La prima cosa che devi sapere è il fatto che la musica trasmette empatia, un concetto importante da conoscere e da mettere in pratica in comunità. Esso consiste nel comprendere l'altro, nel capire e mettersi nei panni del prossimo, cercando di aiutarlo a risolvere un problema o difficoltà che potrebbe incontrare. Tutto questo è molto importante perché in questo modo si può veramente migliorare come persone."
            },
            {
                name: "Roberta",
                msg: "Nel nostro caso, la musica è perfetta perché essa educa l'individuo a relazionarsi con gli altri, trasmettendo emozioni pure e stupende. Avere un contatto con la musica, anche semplicemente ascoltandola, può essere un modo per trovare la propria\npersonalità e, spesso, anche qualcosa in cui credere."
            },
            {
                name: "Roberta",
                msg: "La tua empatia non è certamente quantificabile, ma puoi sicuramente migliorare il tuo modo di relazionarti con gli altri, aiutandoti con la musica!"
            },
            {
                name: "Roberta",
                msg: "In questa prima missione, dovrai cercare e raccogliere le note musicali per aumentare il tuo livello di empatia."
            },
        ]
        this.dialog2 = [
            {
                name: "Roberta",
                msg: "Ottimo lavoro! Spero che grazie a questo simpatico esercizio musicale tu abbia sviluppato la tua empatia!"
            },
            {
                name: "Roberta",
                msg: "Ora procediamo con la seconda prova! Come nella precedente, la musica ci aiuterà ad essere persone migliori e, allo stesso tempo, rendere migliore anche la società"
            },
            {
                name: "Roberta",
                msg: "Un altro tema importante è il rispetto verso la città in cui viviamo. Cerchiamo di capire insieme."
            },
            {
                name: "Roberta",
                msg: "Per essere un corretto cittadino, devi rispettare la città in cui vivi e devi saper riconoscere la sua bellezza: non soltanto quella estetica, ma anche quella simbolica e ideale. Ad esempio, conoscendo il vero significato di bellezza si riesce ad apprezzare maggiormente la propria città e anche a comprendere di più chi ti sta vicino cogliendo varie sfumature di ogni personlità. Inoltre, si riesce a comprendere di più le altre persone e la loro personalità."
            },
            {
                name: "Roberta",
                msg: "Anche in questo caso, alla musica viene riconosciuto il ruolo da educatrice, insegnandoci il significato più puro della bellezza."
            },
            {
                name: "Roberta",
                msg: "In questo modo, tutti saremmo molto più consapevoli delle nostre azioni in città, imparando ad avere rispetto nei confronti del nostro territorio. Questo concetto avvantaggia tutti, a partire dall'ambiente stesso, il quale sta vivendo un periodo critico a causa di un inquinamento oltre ogni limite immaginabile."
            },
            {
                name: "Roberta",
                msg: "Per sensibilizzarti a questo aspetto cruciale della tua educazione civica personale, trova altra musica e migliora la tua consapevolezza della bellezza della città!"
            }
        ]
        this.dialog3 = [
            {
                name: "",
                msg: ""
            },
            {
                name: "Roberta",
                msg: "Complimenti, hai completato tutte le missioni musicali!"
            },
        ]
        this.dialoges = [this.dialog1, this.dialog2, this.dialog3]
        this.currentDialogArray = this.dialoges[this.count]
        this.currentDialoge = this.currentDialogArray[this.msgCount]
        this.dialoging = true
    }
    draw(ctx) {
        if (!this.active) return
        ctx.fillStyle = this.color
        ctx.textAlign = "left"
        ctx.font = "35px Comic Sans MS"
        ctx.fillRect(this.position.x, this.position.y, this.scale.width, this.scale.height)
        ctx.fillStyle = "black"
        ctx.fillText(this.currentDialoge.name, this.position.x + 20, this.position.y + 40)
        ctx.font = "25px Comic Sans MS"
        printAt(ctx, this.currentDialoge.msg, this.position.x + 20, this.position.y + 80, 30, this.scale.width - 10)
    }
    update() {
        if (!this.dialoging) return
        this.position = {
            x: this.gameWidth / 2 - this.scale.width / 2,
            y: this.gameHeight - this.scale.height - 20
        }
        this.currentDialogArray = this.dialoges[this.count]
        this.currentDialoge = this.currentDialogArray[this.msgCount]
    }
}
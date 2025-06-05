
export enum ReadingStatus {
    READING,PAUSED
}

export enum EnclosureSymbol{
    NULL="",
    PARENTHESIS="()",
    DIAMOND_BRACKETS="<>",
    SQUARE_BRACKETS="[]",
    DOUBLE_QUOTES='""',
    SINGLE_QUOTES="''",
    BACKTICKS="``"
}

export interface ActiveWordInterface{
    text:string
    type: EnclosureSymbol
}

export default class ReadingContext {

    //
    private allEnclosureTester = new RegExp(/[`()\[\]{}'"<>]/,"g");
    private wordList:any[]=[];

    constructor(private joystickX:number, private joysticY:number, private status:ReadingStatus,text:string){

        this.wordList = this.getWordSegments(text);
    }

    get wordlist(){
        return this.wordList;
    }

    extractEnclosureParts(sentence:string){
        let matches = sentence.matchAll(this.allEnclosureTester);
        let segments:any[] = [];

        // for(var find in matches){
        //     find[0].
        //     segments.push(find)
        // }
        console.log(matches);
        
        return matches;
    }

    checkEnclosure(sentence:string):string[]|void{
        if(this.allEnclosureTester.test(sentence)){
            this.extractEnclosureParts(sentence)
        }else{
            return [sentence]
        }
    }
    
    getWordSegments(text:string){
        let sentences:string[] = text.split(".");
        let enclosureCheckedSentences = sentences.map(this.checkEnclosure);

        return enclosureCheckedSentences;

    }

}
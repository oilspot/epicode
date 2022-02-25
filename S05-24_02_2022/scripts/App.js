import { FileDoc } from "./FileDoc.js";
import { UserInterface } from "./UserInterface.js";
/*importa le due classi definite negli altri files*/
export class App {
    ui = new UserInterface();
    files = [];
    openFile = null;
    idFile = -1;

    /* costruttore: i dati sono presi dal file editor.js che contengono gli id dell'html, 
    che istanzia una nuova app e tramite il costruttore assegna i valori all'istanza di UserInterface  */
    constructor(_ui) {
        this.ui = _ui;

        /*inizializza tinymce, passando il riferimento all html tramite la proprietà dell'oggetto*/
        tinymce.init({
            selector: `#${this.ui.editor}`
        });


        // quando nei metodi dovrò usare tinymce.get(this.ui.editor) avrò due metodi .setContent() e .getContent()
        /*assegnare le proprietà dell'oggetto riferendosi al DOM e passando la proprietà dell'oggetto UserInterface come sopra*/

        this.save = document.querySelector(`#${this.ui.save}`);
        this.editor = document.querySelector(`#${this.ui.editor}`);
        this.title = document.querySelector(`#${this.ui.title}`);
        this.file_list = document.querySelector(`#${this.ui.file_list}`);
        this.new = document.querySelector(`#${this.ui.new}`);

        //this.click();
        //this.click2();
        this.localCheck();
        this.oggFile();
        //this.crea();
        this.stampa();
        this.svuota();
    }


    /* metodo che fa il bind sul click, attenzione all'uso di this*/
    click() {
        this.save.addEventListener("click", this.crea.bind(this));
        this.stampa();
        console.log('click save');
    }

   /* click2() {
        // this.new.addEventListener("click", this.newDoc.bind(this));
        console.log('click new');
    }*/

    /* metodo che recupera i dati nel localStorage*/
    localCheck() {
        if (localStorage.getItem('files'));
        {
            this.files = JSON.parse(localStorage.getItem("files"));
            //this.files = localStorage.getItem('iiles').split(","); // restituisce errore
        }
    }

    /* metodo che carica l'oggetto file */


    oggFile() {
        this.openFile = new FileDoc(this.files[this.idFile].title, this.files[this.idFile].text);
    };


    /* metodo che ripulisce */



    /* altro metodo: se non ci sono file caricati crea un oggetto file e fa il push nell'array */
    /* altrimenti modifica il file assegnando i valori letti dal form*/
    crea() {
        {
            if (this.openFile == null) {
                let file = new FileDoc();
                file.title = this.title.value;
                file.text = tinymce.get(this.ui.editor).getContent();
                this.files.push(file);
            } else {
                this.openFile.title = this.title.value;
                this.openFile.text = tinymce.get(this.ui.editor).getContent();
                this.files[this.idFile] = this.openFile;
            }
        }
    }

    /* salva l'array nel localStorage e chiama la funzione che stampa a video*/
    prova(){
        if(this.openFile == null){
            let file = new FileDoc();
            file.title = this.title.value;
            file.text = tinymce.get(this.ui.editor).getContent();
            this.files.push(file);
            localStorage.setItem('files',this.files);
            
            stampa();
        }
    }
    

    /* metodo che stampa a video */
    stampa() {

        var list = '';
        for (let i = 0; i < this.files.length; i++) {
            list += `<li class="list-group-item" data-id="${i}">$(this.files[i].title]</li>)`;
        }
        document.querySelector('#file_list').innerHTML = list;

        svuota();
    }


    /* metodo che svuota il form */
    svuota() {
        let file = new FileDoc();
        tinymce.get(this.ui.editor).setContent('');

    }


}
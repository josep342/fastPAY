import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Table } from 'dexie';


export interface Friend{

  id:number;
  bd:string; 
  matriel:string;
  pharmacie:string;

}

export interface InfoAbonne{
  id:number;
  id_phone:string;
  id_tokend:string;
  pwd:string;
  pharmacie:string;

}

export interface Produit{
  
  num?:number;
  matricule:string;
  nom:string;
  categorie:string;
  anti:string;
  traite:string;
  posologie:string;
  age_utilisation:string;
  pu:number;
  stock:number;
  dats:string;
  stock_p:number;
  date_exp:string

}


export interface Comptes{

  num?:number;
  nom:string;
  postnom:string;
  prenom:string;
  sexe:string;
  id:string;
  pwd:number;
  type:string;
  dates:string;

}


 


export interface Impressions{
 
  id:number;
  detail:string; 
  create_date:string; 

}

export interface Achats{

  nums?:number;
  ID_Produit:string;
  nom:string;
  PU:string;
  Qte:string;
  PT:string;
  Nom_client:string;
  Dates:string;
  Dats_id:string;
  id_travailleur:string;

}

@Injectable({
  providedIn: 'root'
})

export class DexiAPIService extends Dexie{

  friends!:Table<Friend,number>;

  infoAbonne!:Table<InfoAbonne,number>;

  produit!:Table<Produit,number>;

  compte!:Table<Comptes,number>;

  impression!:Table<Impressions,number>;

  achat!:Table<Achats,number>;

  constructor() {  

    super('superPharmaBDD');

    this.version(1).stores({

      friends:'id,bd,matriel,pharmacie',

      impression:'id,detail,create_date',

      compte:'++num,nom,postnom,prenom,sexe,id,pwd,type,dates',

      infoAbonne:'id,id_phone,id_tokend,pwd,pharmacie',

      achat:'++nums,ID_Produit,nom,PU,Qte,Nom_client,Dates,Dats_id,id_travailleur',

      produit:'++num,matricule,nom,categorie,anti,traite,posologie,age_utilisation,pu,stock,dats,stock_p,date_exp'
      

    })
  }


  async addProduitMult(data:Produit[]):Promise<number>{

    return await this.produit.bulkAdd(data);
  
  }
  async getProduiID(matricule:string){

    return await this.produit.where('matricule').equals(matricule).toArray();
  
  }

  async getProduitLike(nom:string){
  
    return await this.produit.where('nom').startsWith(nom).toArray();
  
  }

  async getProduit(){

    return await this.produit.toArray();
  
  }

  async produitUpdate(id:number,data:Partial<Produit>):Promise<number>{

    return await this.produit.update(id,data);
  
  }

  async clearProduit(){

    return await this.produit.clear();
  
  }

  async addElementAbonne(data:InfoAbonne):Promise<number>{

    return await this.infoAbonne.add(data);
  
  }

  async deleteElementAbonne(id:number){

    return await this.infoAbonne.delete(id);
  
  }

  async getElementAbonneID(id:number):Promise <InfoAbonne[]>{

    return await this.infoAbonne.where('id').equals(id).toArray();
  
  } 

  async getElementAbonne():Promise <InfoAbonne[]>{

    return await this.infoAbonne.toArray();
  
  }



  async addElement(data:Friend):Promise<number>{

    return await this.friends.add(data);
  
  }

  async addUpdate(id:number,data:Partial<Friend>):Promise<number>{

    return await this.friends.update(id,data);
  
  }

  async getElement():Promise <Friend[]>{

    return await this.friends.toArray();
  
  }

  async deleteElement(id:number){

    return await this.friends.delete(id);
  
  }

  async updateElement(id:number){

    return await this.friends.delete(id);
  
  }





  async addCompteMult(data:Comptes[]):Promise<number>{

    return await this.compte.bulkAdd(data);
  
  }
  async getCompteID(id:string):Promise <Comptes[]>{
  
    return await this.compte.where('id').equals(id).toArray();
  
  }
  
  async clearCompte(){
  
    return await this.compte.clear();
  
  }
  
  
  
  
  async addImpressionMult(data:Impressions[]):Promise<number>{
  
    return await this.impression.bulkAdd(data);
  
  }

  async getImpression():Promise <Impressions[]>{

    return await this.impression.toArray();
  
  }
  
  async clearImpression(){
  
    return await this.impression.clear();
  
  }





  async addAchatMult(data:Achats[]):Promise<number>{
  
    return await this.achat.bulkAdd(data);
  
  }

  async getAchat():Promise <Achats[]>{

    return await this.achat.toArray();
  
  }

  async getAchatDistinctDate(id:any){

    const data= await this.achat.where('id_travailleur').equals(id).toArray()

    return [... new Set(data.map(u=>u.Dates))]
    
  
  }

  async getAchatIDProduitLike(idProd:string){
  
    const data= await this.achat.where('ID_Produit').startsWith(idProd).toArray();

    return [... new Set(data.map(u=>u.ID_Produit))]
  
  }

  async getAchatClientLike(nom:string){
  
    const data= await this.achat.where('Nom_client').startsWith(nom).toArray();

    return [... new Set(data.map(u=>u.Nom_client))]
  
  }


  async getAchatIDProduit(id:string):Promise <Achats[]>{
  
    return await this.achat.where('ID_Produit').equals(id).toArray();
  
  }
  async getAchatClient(nom:string):Promise <Achats[]>{
  
    return await this.achat.where('Nom_client').equals(nom).toArray();
  
  }

  async getAchatDate(id:any,datee:string):Promise <Achats[]>{
  
    const data= await this.achat.where('id_travailleur').equals(id).and(data=>data.Dates.includes(datee)).toArray();


    return data
  
  
  }

  //:Promise <Achats[]>

  async getAchatDateGlobal(id:any,datee:string){

    let tabVal=[]

    let sum=0
    let qte=0


    //const data= await this.achat.where('id_travailleur').equals(id).toArray()

    const data= await this.achat.where('id_travailleur').equals(id).and(data=>data.Dates.includes(datee)).toArray();

    const dataNew = [... new Set(data.map(u=>u.nom))]

    for(let i=0;i< dataNew.length;i++){

      //await this.achat.where('nom').equals(dataNew[i])
      
      const data= await this.achat.where('id_travailleur').equals(id).and(data=>data.Dates.includes(datee) && data.nom ===dataNew[i]).each(p=>{

        qte += Number(p.Qte);
        sum += Number(p.PT);
  
      });

      const newRow={
        nom:dataNew[i],
        Qte:qte,
        PT:sum,
        Dates:datee
      }

      tabVal.push(newRow)

      qte=0
      sum=0

    }

    return tabVal
  
  
  
  }

  async getAchatProduiISum(id:string){
  
    let sum=0

    try{

      await this.achat.where('ID_Produit').equals(id).each(p=>{

        sum += Number(p.Qte);
  
      });

    }

    catch{

      sum=0

    }

    return sum
  
  }

  async clearAchat(){
  
    return await this.achat.clear();
  
  }

  async deleteDatePushSerber(data:any){

    let retDate={}

    let etat=false

    for(let i=0;i<data.length;i++){

      try{

        await this.achat.where('ID_Produit').equals(data[i].ID_Produit).and(op=>op.Nom_client==data[i].Nom_client).and(op=>op.Qte==data[i].Qte).delete();

      }
      catch{

      }

      //retDate[i]=data[i];

      etat=true

    

    }
  
    return etat;
  
  }

   

}

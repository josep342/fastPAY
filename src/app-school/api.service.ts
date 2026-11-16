import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from  '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  urlPaiement:any="https://api-pay.cti-congo.com"

 //server:any="http://0.0.0.0:2222";

  //server:any="http://192.168.1.72:2222";

  server:any="https://api-school.cti-congo.com";

  serverPaie:any="";

  bd:any="pharmaED";

  serverCentral:any='http://146.19.133.197:1625';

  serverPharmaCentral:any='https://api-serverpharma.cti-congo.com';

  private urlAPi='http://'+this.server+'/Pharma/achat';

  constructor(private http: HttpClient) {

    this.create();

  }

  getHeader(){

   return new HttpHeaders({

      "ASKYAS-API-KEY": "acdfe5f4d",
      "Content-Type": "application/json"

    })

  }

  getHeaderPaiment(){

      return new HttpHeaders({

        "ASKYAS-API-KEY": "acdfe5f4d",
        "Content-Type": "application/json"

       })

     }


  data:any;

  data1:any;

  taux:any=0;

  etatServer:any=false;

  idPharmFictif:any='200';

  testerServer(serv:any){

    this.http.get<any>('http://'+serv+'/Pharma/taux/'+this.bd).subscribe(data=>{
      this.data=data.data;
      this.data1=this.data[0];
      this.data1=this.data1[0];

      this.taux=this.data1.taux;

      })

      if(this.taux>0){

        this.etatServer=true;

        this.server=serv;

      }
      else{

        this.etatServer=false

      }

      return this.etatServer


  }

  testingServer(serv:any,bd:any){

    this.server=serv;

    this.bd=bd;

    return this.http.get<any>('http://'+serv+'/Pharma/taux/'+bd);

  }

  async create(){

    //await this.storage.create();

  }

  async clearBd(){

    //await this.storage.clear();

  }

  async saveAdressServer(key:string,value:any){

    //await this.storage.set(key,{key:value});

  }
  async get(key:string){

    //let data = await this.storage.get(key);

    //return JSON.stringify(data);

  }

  async getTousKey(){

    //return await this.storage.keys();

  }

  minorerProduit(idProd:any,qteMin:any,stockVar:any,stockFix:any){

    return this.http.get<any>(this.server+'/Pharma/minorerProd/'+this.bd+'/'+idProd+'/'+qteMin+'/'+stockVar+'/'+stockFix);

  }

  totVenduMin(prod:any){

    return this.http.get<any>(this.server+'/Pharma/totVenduMin/'+this.bd+'/'+prod);

  }


  getInfoImpression():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/impression/'+this.bd);

  }

  getAchat():Observable<any>{

    return this.http.get<any>(this.urlAPi);

  }

  getProduitLIke(preffix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/produit/like/'+this.bd+'/'+preffix);

  }

  getAchatNowDistinctClient():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientCharger/'+this.bd);

  }

  getAchatNowDistinctClientTravId(travId:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerTravId/'+this.bd+'/'+travId);


  }

  getAchatNowDistinctProduit():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitCharger/'+this.bd);

  }

  getAchatNowDistinctProduitIdTrav(idTrav:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerIdTrav/'+this.bd+'/'+idTrav);

  }

  getAchatDistinctDate():Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowDateCharger/'+this.bd);

  }

  getAchatDistinctDateTravId(idTrav:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowDateChargerIdTrav/'+this.bd+'/'+idTrav);


  }

  getAchatNowDistinctClientLike(prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerLike/'+this.bd+'/'+prefix);

  }

  getAchatNowDistinctClientLikeTravId(travId:any,prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowClientChargerLikeTravId/'+this.bd+'/'+travId+'/'+prefix);

  }

  getAchatNowDistinctProduitLike(prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerLike/'+this.bd+'/'+prefix);

  }

  getAchatNowDistinctProduitLikeIdTrav(idTrav:any,prefix:any):Observable<any>{

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitChargerLikeIdTrav/'+this.bd+'/'+ idTrav +'/'+prefix);

  }
  afficheGetProduit(produit:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+ produit);

  }

  getProduitLike(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/produit/like/'+this.bd+'/'+ prefix);

  }

  //AFFICHAGE

  afficheAchatNowIdProduit(produit:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowProduit/'+this.bd+'/'+produit)

  }

  afficheAchatNowIdProduitIdTrav(produit:any,id_trav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowProduitTravId/'+this.bd+'/'+produit+'/'+id_trav)

  }

  afficheAchatNowTravId(id_trav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowTravId/'+this.bd+'/'+id_trav)

  }


  afficheAchatDateTravId(id_trav:any,ddate:any){

    return this.http.get<any>(this.server+'/Pharma/achatTravIdDate/'+this.bd+'/'+id_trav+'/'+ddate)

  }

  afficheAchatNowClient(client:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowClient/'+this.bd+'/'+client)
  }

  afficheAchatNowIdTravClient(client:any,idTrav:any){

    return this.http.get<any>(this.server+'/Pharma/achatNowClientTravId/'+this.bd+'/'+client+'/'+idTrav)
  }

  afficheProduitRech(produit:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+produit)

  }

  afficheProduitFantome(produit:any){

    return this.http.get<any>(this.server+'/Pharma/produit/'+this.bd+'/'+produit)

  }

  verifAutorisation(user:any){

    return this.http.get<any>(this.server+'/Pharma/active/testinf/'+this.bd+'/'+user)

  }

  authentification(data:any){

    return this.http.post<any>(this.server+'/Pharma/authentification',data)

  }


  createMotif(data:any){

    return this.http.post<any>(this.server+'/Pharma/motif/create/',data)

  }

  createCommandeFacture(data:any){

    return this.http.post<any>(this.server+'/Pharma/commandeFacture/createBroadCast',data)

  }

  deconnexion(idTrav:any){

    return this.http.delete<any>(this.server+'/Pharma/deconnexion/'+this.bd+'/'+idTrav)

  }

  closingDay(idTrav:any){

    return this.http.delete<any>(this.server+'/Pharma/sessionClosed/'+this.bd+'/'+idTrav)


  }

  getTaux(){

    return this.http.get<any>(this.server+'/Pharma/taux/'+this.bd);


  }

  getMotif(idTrav:any){

    return this.http.get<any>(this.server+'/Pharma/motif/'+this.bd+'/'+idTrav);

  }

  updateProduit(data:any){

    return this.http.post<any>(this.server+'/Pharma/produit/update/',data);

  }

  createProduit(data:any){

    return this.http.post<any>(this.server+'/Pharma/produit/createBroadCast/',data);


  }

  chargeProforma(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/preforma/like/'+this.bd+'/'+prefix);

  }

  afficheProforma(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/preforma/'+this.bd+'/'+prefix);

  }

  chargerPriseCharge(client:any){

    return this.http.get<any>(this.server+'/Pharma/prisecharge/like/'+this.bd+'/'+client);

  }

  validateCouponSImple(data:any){

    return this.http.post<any>(this.server+'/Pharma/achat/createBroadCast',data);

  }

  validatePrescription(data:any){

    return this.http.post<any>(this.server+'/Pharma/prescription/createBroadCast',data);

  }

  saveProforma(data:any){

    return this.http.post<any>(this.server+'/Pharma/preforma/createBroadCast',data);

  }

  createSCPO(data:any){

    return this.http.post<any>(this.server+'/Pharma/preforma/createBroadCast',data);

  }

  controleurValidationCoupon(data:any){

    return this.http.post<any>(this.server+'/Pharma/controlleurCoupon',data);

  }

  createPriseCharge(data:any){

    return this.http.post<any>(this.server+'/Pharma/priseCharge/create',data);

  }
  updatePriseCharge(data:any){

    return this.http.post<any>(this.server+'/Pharma/priseCharge/update',data);

  }

  getLIkePriseChaege(prefix:any){

    return this.http.get<any>(this.server+'/Pharma/priseChargeLIke/'+this.bd+'/'+prefix);

  }

  getPriseChargeAffiche(gmail:any){

    return this.http.get<any>(this.server+'/Pharma/priseChargeAffiche/'+this.bd+'/'+gmail);

  }

  getDistinctPrescr(prefixPrise:any){

    return this.http.get<any>(this.server+'/Pharma/prescriptionDistinct/'+this.bd+'/'+prefixPrise);

  }

  getPrescrPrise(prise:any){

    return this.http.get<any>(this.server+'/Pharma/prescription/'+this.bd+'/'+prise);

  }

  autoriserUSer(user:any){

    return this.http.get<any>(this.serverCentral+'/Pharma/autorisationUser/'+this.idPharmFictif+'/'+user)

  }

  destroySession(idUser:any){

    return this.http.get<any>(this.serverCentral+'/Pharma/DestroySession/'+this.idPharmFictif+'/'+idUser)


  }
  getInfoPromotion(){

    return this.http.get<any>(this.serverCentral+'/Pharma/getInfoPublicite/'+this.bd)

  }

  ///////////////////////////




  authentificationPay(data:any){

    return this.http.post<any>(this.server+'/authentificationPay',data);

  }

  getLikeEleve(refEcole:any,ref:any){

    return this.http.get<any>(this.server+'/SchoolPay/eleveLikRefEcole/'+refEcole+'/'+ref)

  }

  getEleveAffiche(ref:any, refEcole:any){

    const data={

      refEcole:refEcole,
      matricule:ref

    }

    return this.http.post<any>(this.server+'/SchoolPay/eleve',data)

  }


  getEleveAfficheNow(ref:any){

    const data={

      matricule:ref

    }

    return this.http.post<any>(this.server+'/SchoolPay/elevenNow',data)

  }


  getEleveAffichePayNow(ref:any){

    const data={

      matricule:ref

    }

    return this.http.post<any>(this.server+'/SchoolPay/eleveNow',data)

  }


  getDatePaieDistinct(refEcole:any){

    return this.http.get<any>(this.server+'/paiement/distinct/'+refEcole)

  }

  getDatePaieDistinctAffiche(refEcole:any,ref:any){

    return this.http.get<any>(this.server+'/paiement/AfficheDate/'+ refEcole +'/'+ref)

  }


  createPay(data:any){

    return this.http.post<any>(this.server+'/paiement/Create',data);

  }

  createEleve(data:any){

    return this.http.post<any>(this.server+'/eleve/Create',data);

  }

  createRecours(data:any){

    return this.http.post<any>(this.server+'/recoours/Create',data);

  }

  annulationRecours(data:any){

    return this.http.post<any>(this.server+'/recoours/annulation',data);

  }




  getRecours(){

    return this.http.get<any>(this.server+'/recours')


  }

  confirmationRetrait(data:any){

    return this.http.post<any>(this.server+'/retrait/Confirmation',data);

  }


  createRetrait(data:any){

    return this.http.post<any>(this.server+'/retrait/create',data);

  }

  createCasSocial(data:any){

    return this.http.post<any>(this.server+'/cas_social/Create',data);

  }

  createCorrectif(data:any){

    return this.http.post<any>(this.server+'/correctif',data);

  }

  getCorrectif(section:any,classe:any){

    return this.http.get<any>(this.server+'/correctif/get/'+section +'/'+classe)

  }


  getCasSocio(refEcole:any,refEleve:any){

    return this.http.get<any>(this.server+'/casSocial/'+refEcole +'/'+refEleve)

  }




  getRetraitForSearch(){

    return this.http.get<any>(this.server+'/retrait/search')

  }

  etEtatRetrait(){

    return this.http.get<any>(this.server+'/retrait')

  }




  getClasse(refEcole:any,seleceur:any){

    return this.http.get<any>(this.server+'/classe/distinct/'+refEcole+'/'+seleceur)

  }

  getClasseID(ref:any){

    return this.http.get<any>(this.server+'/classe/'+ref)

  }


  getSection(refEcole:any){

    return this.http.get<any>(this.server+'/section/distinct/'+refEcole)

  }

  getSectionID(ref:any){

    return this.http.get<any>(this.server+'/section/'+ref)

  }

  getVacation(){

    return this.http.get<any>(this.server+'/vacation/distinct')

  }

  getVacationID(ref:any){

    return this.http.get<any>(this.server+'/vacation/'+ref)

  }

  listageaClasse(section:any,classe:any,montant:any){

    return this.http.get<any>(this.server+'/paiement/AfficheListageClasse/'+section +'/'+classe +'/'+montant)

  }

  listageaSection(section:any,montant:any){

    return this.http.get<any>(this.server+'/paiement/AfficheListageSection/'+section +'/'+montant)

  }

  getPayEleve(id:any){

    return this.http.get<any>(this.server+'/eleve/payNow/'+id)

  }


  generateFileList(idEcole:any){

    return this.http.get<any>(this.server+'/generateFileList/'+idEcole)

  }

  generateFile(idEcole:any){

    return this.http.get<any>(this.server+'/generateFile/'+idEcole)

  }

  getEcole(){

    return this.http.get<any>(this.server+'/SchoolPay/ecole')

  }

   getInfoChecking(refEcole:any,section:any,classe:any,nom:any){

    return this.http.get<any>(this.server+'/SchoolPay/checkingSave/' +refEcole +'/' +section +'/'+classe +'/'+nom)

  }

  getFacture(id_pharma:any){

    return this.http.get<any>(this.serverPharmaCentral+'/Pharma/getFacture/'+id_pharma);

  }

  createPaiement(data:any){

    return this.http.post<any>(this.serverPharmaCentral+'/cPaiement/create',data); //, { headers:this.getHeaderPaiment()}

  }

  getPaiement(id_pharma:any){

    return this.http.get<any>(this.serverPharmaCentral+'/Pharma/paiement/'+id_pharma);

  }


}

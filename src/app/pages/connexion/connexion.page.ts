import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { musicalNotes } from 'ionicons/icons';
import { ApiService } from '../api.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import {LoadingController } from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';


import { fileTrayStackedOutline, flashOff, flask, thumbsDownOutline } from 'ionicons/icons';

import { DexiAPIService,Friend} from '../dexi-api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
  standalone:false
})
export class ConnexionPage implements OnInit {

    constructor(private api: ApiService,private dexiAPI:DexiAPIService,private route:ActivatedRoute, private router:Router){

    }

    etat:any=0;
    data:any=[];
    data1:any=[]
    stock:any=350;

    taux:any=0;

    donnes:any;
    produit:any;
    id:any;
    server:any;
    rep:any;
    etatReq:any;
    prefixProdui:any="";
    listProduiLike:any;
    tab:any;
    tab1:any;
    nomProduit:any="";
    infoProd:any;
    listInfo:any;
    dataProduitDistinct:any;

    prefixRech:any="";

    dataOrdo:any;
    dataOrdoInfo:any;

    foc:any;

    pu:any=0;
    idProd:any="";
    nomProd:any="";
    puProd:any=0;
    qtProd:any="";

    elemRetrait:any=0;
    elemSup:any;
    elemSupInfo:any;
    dataTempon:any;
    couponTempon:any;

    affichNom:any="-";
    affichPu:any="";
    affichExp:any="";
    affichCat:any="";
    affichTraite:any="";
    affichAnti:any="";
    affichPos:any="";
    affichAge:any="";
    affichStock:any="-";
    clientJournal:any="";
    idProdJournal:any="";
    dateJournal:any;
    repRech:any;

    typeMappage:any=0;

    typeAffich:any=""

    public etatmobile=window.innerWidth;

    public dataa :any=["junior","joseph"];

    etatCoupon:any=0;

    tabProduit='';
    tabl:any=[]

    i:any=0;
    netPayer:any=0;
    netJournal:any=0;

    dictData:{[key:string]:any}={};




    tabProfoCharger:{id_prod:string,nom:string,nom_client:string,pu:number,qt:number,pt:number}[]=[];


    dataRepAbonne:{id:number,id_phone:string,id_tokend:string,pwd:string,pharmacie:string}[]=[];

    tableCoupon:{num:number,ID_Produit:string,nom:string,PU:number,Qte:number,PT:number,id_travailleur:string,Nom_client:string}[]=[];


    dataTabImpessio:{ID_Produit:string,nom:string,PU:number,Qte:number,PT:number,id_travailleur:string,Nom_client:string}[]=[];

    //tableCoupon:{num:number,id:string,nom:string,puu:number,qte:number,pt:number}[]=[];

    tableCouponInfo:{date_exp:string,categorie:string,traite:string,anti:string,posologie:string,age_utilisation:string,stock_p:string}[]=[];

    tableProduitAJout:{num:number,matricule:string,nom:string,categorie:string,anti:string,traite:string,posologie:string,age_utilisation:string,pu:number,stock:number,stock_p:number,exp:string,idUser:string}[]=[];

    tableCommandeRav:{num:number,id_prod:string,ajout:Number,pucdf:Number,idTrav:string,impactprix:number,nom:string,pusd:Number,exp:string,pt:number}[]=[];


    tabDateAnne:any=['2025','2026','2027','2028','2029','2030'];

    tabDateMois:any=['1','2','3','4','5','6','7','8','9','10','11','12'];

    tabDateJOur:any=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];

    tabDevise=[
      {'devise':"USD"},
      {'devise':"CDF"}
    ]

    tabMotif=[
      {'motif':"Retournement Produit"},
      {'motif':"Sorti d'argent"},
      {'motif':"Rupture Stock"},
      {'motif':"Autres"}
    ];

    tabMedia:any=['Terminal','Machine'];
    mediaScreen:any='';


    dataPropo:any="AAAA-MM-JJ";

    tabInfoImpression:any=['NOM DE LA PHARMACIE','RCCM K004/BN/5005 2024','Kin-Gombe/OLD-GATE','Tél +243 970494397']

    ngOnInit() {

      this.testerServerFront()

      this.afficheFront()

      this.getpermissionVerificateurStock()

      this.getImpression()

    }

    async authentificatonAbonnes(){

      this.dataRepAbonne= await this.dexiAPI.getElementAbonneID(this.pharmacieId)



      if(this.pwdAuthentification==this.dataRepAbonne[0].pwd){

        document.getElementById('divConn')!.style.display="none";
        document.getElementById('divApp')!.style.display="block";

      }
      else{

        alert('Mot de Passe incorrect !! ')

      }

    }

      repserve:any=false;

      serverAdr:any="";

      serverClaire:any="";

      serverAPI:any="";

      bd:any="";

      bdPure:any="";

      tokend:any='';

      pwdAbonneWrite:any=''

      idPhone:any=''


      dataSecurABonnes:{id_phone:string,id_tokend:string,pwd:string}[]=[];





      pharmacieId:any=0

      refPharma:any=''


    async testerServer(){

            this.api.testingInfoABonnes(Number(this.tokend)).subscribe(data=>{

              this.rep=data.data ;

              if(this.rep.length>0){

                  this.pharmacieId=this.rep[0].id_pharma

                  const datenow = new Date();

                  this.idPhone=this.tokend.substring(1,10)+ datenow.toISOString() +this.tokend.substring(7,2)+'#'+this.pharmacieId;


                this.dexiAPI.deleteElementAbonne(this.pharmacieId);

                this.dexiAPI.addElementAbonne({id:this.pharmacieId,id_phone:this.idPhone,id_tokend:this.tokend,pwd:this.pwdAbonneWrite,pharmacie:this.refPharma});

                this.afficheFront();

                document.getElementById('pageServer')!.style.display="none";
                document.getElementById('divConn')!.style.display="block";

              }
              else{

                alert("Acces Restreint, veuillez bien saisir Votre Tokend d access ou consulter votre Pharmacie si le probleme persiste")

              }


            })


          }

          async verifiProtectionAbonnes(){

            this.dataRepAbonne= await this.dexiAPI.getElementAbonneID(this.pharmacieId)

          }

          async afficheFront(){

            this.dataSecurABonnes= await this.dexiAPI.getElementAbonne();

          }

          nomPharma:any='';

          testerServerAuto(bd:any){



            this.bd=this.serverClaire[1];

            this.api.testingServer(this.serverAPI,this.bd).subscribe(response=>{

              this.rep=response ;

              this.data=this.rep.data;
              this.data1=this.data[0];
              this.data1=this.data1[0];

              this.taux=this.data1['taux'];

              if(this.taux>0){

                document.getElementById('pageServer')!.style.display="none";
                document.getElementById('divConn')!.style.display="block";

              }
              else{

                alert("Acces Restreint, veuillez bien saisir Votre Tokend d access ou consulter votre Pharmacie si le probleme persiste")

              }


            })

          }

          tabPublicite:any=[]



          getInfoPub(){

            try{

              this.api.getInfoPromotion().subscribe(response=>{

                this.tabPublicite=response.data;

              })

            }
            catch{

            }

          }

          etatServ:any=0;
          textBtn:any="Qr Code";



          changerModeConnexion(){

            if(this.etatServ==0){

              document.getElementById('cadre1')!.style.display="none";
              document.getElementById('cadre2')!.style.display="block";

              document.getElementById('cadre3')!.style.display="none";

              this.etatServ=1;

              this.textBtn="Adresse";


            }
            else{

              document.getElementById('cadre2')!.style.display="none";
              document.getElementById('cadre1')!.style.display="block";

              document.getElementById('cadre3')!.style.display="block";


              this.etatServ=0;


              this.textBtn="Qr Code";

            }



          }



          idPharma:any=0;

          pwd:string="";

          etatActivte:any=false;
          etatConnexion:any=false;

          etatclose:any=true;
          actif:any=false;

          autorisation:any=false;


          pwdAuthentification:any='';

          phoneAB:any=''
          tokendAB:any=''
          pwdAB:any=''



          authentfication(){

            this.dataSecurABonnes.forEach(item=>{

              this.phoneAB=item.id_phone;
              this.tokendAB=item.id_tokend;
              this.pwdAB=item.pwd;

            })

            this.etatConnexion=false;
            this.actif=true;
            this.etatclose=true;
            this.autorisation=false


              const data={
                id_phone:this.phoneAB,
                id_tokend:this.tokendAB
              }

              if(this.pwdAB==this.pwdAuthentification){

                this.api.testingTokendValable(data).subscribe(data=>{

                  this.rep=data.data

                  if(this.rep.length>0){

                    document.getElementById('divConn')!.style.display="none";
                    document.getElementById('divApp')!.style.display="block";

                  }
                  else{

                    alert('Acces Restreint à ce TOKEND, Vueillez consulter le gestionaire de votre Pharmacie')

                  }

                })

              }

              else{

                alert('Mot de passe incorrect')

              }


      }


    typeDeviseRav:any="";
    deviseRav:any="CDF";
    puProPushRav:any=0;

    propoAnneDate:any="";
    moisAnneDate:any="";
    jourAnneDate:any="";

    anneDate:any="";
    moisDate:any="";
    jourDate:any="";

    motifValue:any="";
    montantMotif:any="";
    detailMotif:any="";

    propoAnne(){

      if(this.moisAnneDate==""){

        this.moisDate="12";
      }
      else{
        this.moisDate=this.moisAnneDate;
      }

      if(this.jourAnneDate==""){
        this.jourDate="30";
      }
      else{
        this.jourDate=this.jourAnneDate;
      }

      this.anneDate=this.propoAnneDate;

      this.dataPropo=this.anneDate+"-"+this.moisDate+"-"+this.jourDate;

    }

    propoMois(){

      if(this.propoAnneDate==""){

        this.anneDate="2026";
      }
      else{
        this.anneDate=this.propoAnneDate;
      }

      if(this.jourAnneDate==""){
        this.jourDate="30";
      }
      else{
        this.jourDate=this.jourAnneDate;
      }

      this.moisDate=this.moisAnneDate;

      this.dataPropo=this.anneDate+"-"+this.moisDate+"-"+this.jourDate;
    }

    propoJour(){

      if(this.propoAnneDate==""){

        this.anneDate="2026";
      }
      else{
        this.anneDate=this.propoAnneDate;
      }

      if(this.moisAnneDate==""){

        this.moisDate="12";
      }
      else{
        this.moisDate=this.moisAnneDate;
      }

      this.jourDate=this.jourAnneDate;

      this.dataPropo=this.anneDate+"-"+this.moisDate+"-"+this.jourDate;

    }

    changeDeviseRav(){

      if(this.typeDeviseRav=="USD"){

          this.deviseRav="USD";

      }
      else{
        this.deviseRav="CDF";
      }


    }

    dataRav:any;

    prixRavcdf:any=0;
    prixRavusd:any=0;
    ppu:any;



    ajoutProduitRav(){

      if(this.taux<=0){

        alert("TAUX not founf");

      }
      else{

        if(this.dataPropo=="AAAA-MM-JJ" || this.prixRavProx<=0 || this.qteRavPro<=0 ){

          alert("saisie erronnee");

        }
        else{

          if(this.prixRavProx > 0 && this.qteRavPro > 0){

            try{

              if(this.deviseRav=="USD"){

                this.prixRavcdf=this.prixRavProx * this.taux;

                //this.prixRavusd=this.prixRavProx;
                this.prixRavusd=Math.ceil(this.prixRavProx*100)/100

              }
              else{

                this.prixRavcdf=this.prixRavProx;

                this.ppu=this.prixRavProx/this.taux;

                //this.prixRavusd=parseFloat(this.ppu.toFixed(2));

                this.prixRavusd=Math.ceil(this.ppu*100)/100

                //this.puProPushRav=this.prixRavProx/this.taux;

              }

              this.i=this.tableCommandeRav.length +1;

              this.dataRav={

                num:this.i,
                id_prod:this.idRavPro,
                ajout:this.qteRavPro,
                pucdf:parseInt(this.prixRavcdf),
                idTrav:this.id,
                impactprix:1,
                nom:this.nomRavProx,
                pusd:this.prixRavusd,
                pt:parseInt(this.prixRavcdf) * parseInt(this.qteRavPro),
                exp:this.dataPropo

              }

              this.tableCommandeRav.push(this.dataRav);

              alert("Produit Ajouté ! ");

              this.netPayerRav=this.netPayerRav+(this.prixRavcdf * this.qteRavPro);

              this.stockRavPro="";
              this.nomRavProx="";
              this.prixRavProx="";
              this.qteRavPro="";
              this.idRavPro="";
              this.stockRavPro="";

            }
            catch{
              alert("error!!, verifier les donnees saisies");
            }

          }
          else{

            alert("saisie erronnee");

          }
      }
  }

    }

    elemSupRav:any="";

    netPayerRav:any=0;

    indiceRetrait:any=0;

    retireProduitRAv(){

      this.elemSupRav=this.tableCommandeRav[this.indiceRetrait-1];

      this.tableCommandeRav.splice(this.elemSupRav-1,1);

      this.netPayerRav=this.netPayerRav-this.elemSupRav.pt;

      this.i=1;

      this.tableCommandeRav.forEach(item=>{

        item.num=this.i;

        this.i=this.i+1;
      })

      this.dataPropo=this.elemSupRav.exp;
      this.nomRavProx=this.elemSupRav.nom;
      this.prixRavProx=this.elemSupRav.pucdf;
      this.qteRavPro=this.elemSupRav.ajout;
      this.idRavPro=this.elemSupRav.id_prod;
      this.stockRavPro=0;

      alert("Effectué !! ");

    }

    checkerCoupon(){

      this.netPayerRav=0;

      this.tableCommandeRav.forEach(item=>{

        this.netPayerRav=this.netPayerRav+item.pt;
      })

      this.i=1;

      this.tableCommandeRav.forEach(item=>{

        item.num=this.i;

        this.i=this.i+1;

      })

      alert("Effectué !! ");

    }

    repInfoRav=[]
    dataEchecRav:any=[]

    validerCOmmandeFacture(){

      //this.dictData={};

      //this.dataEchecRav=[]

      //this.dictData['nbr']=this.tableCommandeRav.length;

      //this.dictData['bd']=this.api.bd;

      //for(let i=0;i<this.tableCommandeRav.length;i++){

      //  this.dictData[i]=this.tableCommandeRav[i];

      //}

      this.dictData={};

      this.dictData['data']=this.tableCommandeRav

      this.dictData['bd']=this.api.bd;


      this.api.createCommandeFacture(this.dictData).subscribe(data=>{

      this.repInfoRav=data;

      this.etatConn=data.etat;

      this.dataEchecRav=data.echec;

      if(this.etatConn==true){

        if(this.dataEchecRav.length>0){

          alert("Effectué ! NOTA: Données envoyées sont minues d erreur, vous trouverez les produit dont le traitement a échoué dans la rubrique => ERROR en bas !");

          alert("NOTA: Veuillez recommencer et eviter les erreurs");


        }
        else{

          alert("Effectué avec succes !");

        }

        this.tableCommandeRav=[];
        this.netPayerRav=0;

      }
      else{
        alert("Error ! une exception a été gerée");
      }

    })

    }

    typeDevise:any="CDF";
    devise:any="CDF";
    puProPush:any;

    changeDevise(){

      if(this.typeDevise=="USD"){

          this.devise="USD";


      }
      else{
        this.devise="CDF";
      }


    }

    dataElementCreate:any=[];
    repdataAJout:any;

    prixUsd:any;
    numAJout:any="";



    tabProdVal:{[key:string]:any}={};

    repdataAJoutCreate:any=[];

    saveProdui(){

      if(this.nomAJout=="" || parseInt(this.stockAJout)<=0 || parseInt(this.prixAJout)<=0 || this.dataPropo=="AAAA-MM-JJ"){
        alert("Sasie érronée !!")
      }
      else{


        if(this.devise=="USD"){

        this.prixUsd=this.prixAJout;

        }
        else{

          this.prixUsd=parseInt(this.prixAJout)/this.taux;


        }

        this.prixUsd=Math.ceil(this.prixUsd*100)/100;

        const dataCreateProd:{[key:string]:any}={

          nom:this.nomAJout,
          categorie:"-",
          anti:"-",
          traite:"-",
          posologie:"-",
          age_utilisation:"-",
          pu:this.prixUsd,
          stock:this.stockAJout,
          stock_p:this.stockAJout

        }

        const dataCreateExp:{[key:string]:any}={

          date_exp:this.dataPropo

        }

        this.tabProdVal['a']=dataCreateProd;

        this.tabProdVal['b']=dataCreateExp;

        this.tabProdVal['bd']=this.api.bd;

        this.etatConn=false;

        this.api.createProduit(this.tabProdVal).subscribe(data=>{

          this.repdataAJoutCreate=data;

          this.etatConn=data.etat;

          if(this.etatConn==true){

            alert("Effectué !");

            this.numAJout='1';

            this.dataElementCreate=[];

            dataCreateProd['exp']=this.dataPropo;

            this.dataElementCreate.push(dataCreateProd);

            this.nomAJout="";
            this.prixAJout="";
            this.stockAJout="";

          }
          else{

            alert("Error ! une erreur s est produite, veuillez actualiser le TAUX et la DEVISE si le nom,prix,stock et péremption sont saisis correctement");

          }

        })

      }

    }

    tabDataModif:{[key:string]:any}={};

    dataUpdate:any[]=[];

    dataElement:any;
    repdataModif:any;
    dataRep:any;
    dataElementUpdate:any=[];

    dataUpdateBd:{[key:string]:any}={};

    modifierProduit(){

      try{

        if(this.devise=="USD"){

          this.puProPush=Math.ceil(this.prixMisAJour*100)/100;

        }
        else{

          this.puProPush=Math.ceil((this.prixMisAJour/this.taux)*100)/100;

        }

        const dataElement:{[key:string]:any}={

          id_prod:this.idMisAJour,
          nom:this.nomMisAJour,
          categorie:"-",
          anti:"-",
          traite:"-",
          posologie:"-",
          age_utilisation:"-",
          pu:this.puProPush,
          exp:this.dataPropo

        }

        this.dataElementUpdate=[];

        this.dataUpdateBd['data']=dataElement

        this.dataUpdateBd['bd']=this.api.bd;

        this.dataUpdateBd['user']=this.id;

        this.api.updateProduit(this.dataUpdateBd).subscribe(data=>{

          this.repdataModif=data;
          this.dataRep=data.etat;

          if(this.dataRep==true){

            alert("Effectué !");

            this.idMisAJour="";
            this.nomMisAJour="";
            this.prixMisAJour="";

            this.dataElementUpdate.push(dataElement);
          }
          else{

            alert("Echoué ! erreur inattendu !");

          }
        })

      }
      catch{
        alert("error!!, verifier les donnees saisies");
      }

    }

    changeMappage(){
      if(this.typeMappage=="Particulier"){

        this.typeMappage=1;

      }
      else if(this.typeMappage=="Universel"){

        this.typeMappage=0;

      }
    }

    chargerTaux(){
      this.api.getTaux().subscribe(data=>{
        this.data=data;
        this.data1=data.data;
        this.data=this.data1[0];
        this.datanew=this.data[0];

        this.taux=this.datanew['taux'];
      })

    }

    selectDistinctClient(){

      this.dataProduitDistinct=[];

      if(this.typeMappage==1){

        if(this.prefixRech==""){

          this.api.getAchatNowDistinctClientTravId(this.id).subscribe(data=>{
            this.data=data;
            this.data1=data.data;
            this.dataProduitDistinct=this.data1[0]
          })

        }
        else{
          this.api.getAchatNowDistinctClientLikeTravId(this.id,this.prefixRech).subscribe(data=>{
          this.data=data;
          this.data1=data.data;
          this.dataProduitDistinct=this.data1[0]
          })


        }

      }
      else{

        if(this.prefixRech==""){

          this.api.getAchatNowDistinctClient().subscribe(data=>{
            this.data=data;
            this.data1=data.data;
            this.dataProduitDistinct=this.data1[0]
          })

        }
        else{
          this.api.getAchatNowDistinctClientLike(this.prefixRech).subscribe(data=>{
          this.data=data;
          this.data1=data.data;
          this.dataProduitDistinct=this.data1[0]
          })


        }

      }

    }

    selectDistinctProduit(){

      this.dataProduitDistinct=[];

      if(this.typeMappage==1){

        if(this.prefixRech==""){
            this.api.getAchatNowDistinctProduitIdTrav(this.id).subscribe(data=>{
            this.data=data;
            this.data1=data.data;
            this.dataProduitDistinct=this.data1[0]
          })
        }
        else{
            this.api.getAchatNowDistinctProduitLikeIdTrav(this.id,this.prefixRech).subscribe(data=>{
            this.data=data;
            this.data1=data.data;
            this.dataProduitDistinct=this.data1[0]
          })
        }
      }
      else{

        if(this.prefixRech==""){
          this.api.getAchatNowDistinctProduit().subscribe(data=>{
          this.data=data;
          this.data1=data.data;
          this.dataProduitDistinct=this.data1[0]
        })
      }
      else{
          this.api.getAchatNowDistinctProduitLike(this.prefixRech).subscribe(data=>{
          this.data=data;
          this.data1=data.data;
          this.dataProduitDistinct=this.data1[0]
        })
      }

      }

    }

    getDistinctDate(){

      this.dataProduitDistinct=[];

        this.api.getAchatDistinctDateTravId(this.id).subscribe(data=>{
        this.data=data;
        this.data1=data.data;
        this.dataProduitDistinct=this.data1[0]

      })


    }

    nomAJout:any="";
    prixAJout:any=0;
    stockAJout:any=0;
    dateAJout:any="";

    dataAJout:any=[];

    typeDeviseAjout:any="USD";

    puuTempo:any=0;
    puAjoutNew:any=0;

    taillCoupon:any=0;

    ajoutPrpduitAjout(){

      try{

        if(this.nomAJout =="" || this.prixAJout <=0 || this.stockAJout<=0 ){

            alert("saisie erronnée! ");
        }
        else{

          if(this.typeDeviseAjout=="USD"){

            this.puAjoutNew=this.prixAJout;

          }
          else{

            this.puuTempo=this.prixAJout/this.taux;

            this.puAjoutNew=parseFloat(this.puuTempo.toFixed(2));
          }

         this.i=this.tableProduitAJout.length +1;

         this.taillCoupon=this.tableCoupon.length;

          this.dataAJout={
            num:this.i,
            matricule:String(this.i),
            nom:this.nomAJout,
            categorie:"-",
            anti:"-",
            traite:"-",
            posologie:"-",
            age_utilisation:"-",
            pu:this.puAjoutNew,
            stock:Number(this.stockAJout),
            stock_p:Number(this.stockAJout),
            exp:this.dataPropo,
            idUser:this.id
           }

          this.tableProduitAJout.push(this.dataAJout);

          this.nomAJout="";
          this.prixAJout="";
          this.stockAJout="";

          alert("Produit Ajouté ! ");



        }


      }
      catch{
        alert("error!! ");
      }


    }

    ajourOrdonance(){

      if(this.permissionVerifStock==true){

        if(this.qtProd > 0 && this.qtProd <= this.listInfo.stock_p){

          this.i=this.tableCoupon.length +1;

          this.netPayer=this.netPayer+(parseInt(this.affichPu)*parseInt(this.qtProd));

          this.dataOrdo={
            num:this.i,
            ID_Produit:this.idProd,//listInfo.matricule,
            nom:this.affichNom,//listInfo.nom,
            PU:parseInt(this.affichPu),//),listInfo.puu),
            Qte:this.qtProd,
            PT:parseInt(this.affichPu)*parseInt(this.qtProd)
          }

          this.tableCoupon.push(this.dataOrdo);

          this.dataOrdoInfo={
            date_exp:this.affichExp,//this.listInfo.date_exp,
            categorie:this.affichCat,//this.listInfo.categorie,
            traite:this.affichTraite,//this.listInfo.traite,
            anti:this.affichAnti,//this.listInfo.anti,
            posologie:this.affichPos,//this.listInfo.posologie,
            age_utilisation:this.affichAge,//this.listInfo.age_utilisation,
            stock_p:this.affichStock //listInfo.stock_p
          }

          this.tableCouponInfo.push(this.dataOrdoInfo);

          this.affichNom="";
          this.affichPu="";
          this.affichExp="";
          this.affichCat="";
          this.affichTraite="";
          this.affichAnti="";
          this.affichPos="";
          this.affichAge="";
          this.affichStock="";
          this.qtProd="";


          //this.tableCoupon=this.couponTempon;

        }
        else{

          alert("Stock Insufisant  ou saisie erronnée! ");

        }

      }
      else{

        if(this.qtProd > 0 ){

          this.i=this.tableCoupon.length +1;

          this.netPayer=this.netPayer+(parseInt(this.affichPu)*parseInt(this.qtProd));

          this.dataOrdo={
            num:this.i,
            ID_Produit:this.idProd,//listInfo.matricule,
            nom:this.affichNom,//listInfo.nom,
            PU:parseInt(this.affichPu),//),listInfo.puu),
            Qte:this.qtProd,
            PT:parseInt(this.affichPu)*parseInt(this.qtProd)
          }

          this.tableCoupon.push(this.dataOrdo);

          this.dataOrdoInfo={
            date_exp:this.affichExp,//this.listInfo.date_exp,
            categorie:this.affichCat,//this.listInfo.categorie,
            traite:this.affichTraite,//this.listInfo.traite,
            anti:this.affichAnti,//this.listInfo.anti,
            posologie:this.affichPos,//this.listInfo.posologie,
            age_utilisation:this.affichAge,//this.listInfo.age_utilisation,
            stock_p:this.affichStock //listInfo.stock_p
          }

          this.tableCouponInfo.push(this.dataOrdoInfo);

          this.affichNom="";
          this.affichPu="";
          this.affichExp="";
          this.affichCat="";
          this.affichTraite="";
          this.affichAnti="";
          this.affichPos="";
          this.affichAge="";
          this.affichStock="";
          this.qtProd="";


          //this.tableCoupon=this.couponTempon;

        }
        else{

          alert("saisie erronnée! ");

        }


      }

    }

    corrigerCalcul(){

      this.netPayer=0;

      this.tableCoupon.forEach(item=>{

        this.netPayer=this.netPayer+item.PT

      })

      alert("effectué!")

      this.taillCoupon=this.tableCoupon.length;

    }
    supprimerCoupon(){
      this.tableCoupon=[];
      this.tableCouponInfo=[];

      this.netPayer=0;
    }

    retirerElement(){

      this.elemSup=this.tableCoupon[this.elemRetrait-1];
      this.elemSupInfo=this.tableCouponInfo[this.elemRetrait-1];


      this.tableCoupon.splice(this.elemRetrait-1,1);
      this.tableCouponInfo.splice(this.elemRetrait-1,1);

      this.netPayer=this.netPayer-this.elemSup.PT;


      // la reoganisation de position

      this.i=1;

      this.tableCoupon.forEach(item=>{

        item.num=this.i;

        this.i=this.i+1;

        this.taillCoupon=this.tableCoupon.length;
      })

      this.qtProd=this.elemSup.Qte;
      this.idProd=this.elemSup.ID_Produit;
      this.affichNom=this.elemSup.nom;
      this.affichPu=this.elemSup.PU;

      this.affichExp=this.elemSupInfo.date_exp;
      this.affichCat=this.elemSupInfo.categorie;
      this.affichTraite=this.elemSupInfo.traite;
      this.affichAnti=this.elemSupInfo.anti;
      this.affichPos=this.elemSupInfo.posologie;
      this.affichAge=this.elemSupInfo.age_utilisation;
      this.affichStock=this.elemSupInfo.stock_p;

      alert("Effectué !! ");



    }


    async selectLike(){

      //const req=await axios.get('http://'+this.server+'/Pharma/produit/like/'+this.prefixProdui);

      this.api.getProduitLIke(this.prefixProdui).subscribe(data=>{

        this.rep=data;

        this.tab=this.rep['data'];

        this.listProduiLike=this.tab[0];

        this.affichNom="";
        this.affichPu="";
        this.affichExp="";
        this.affichCat="";
        this.affichTraite="";
        this.affichAnti="";
        this.affichPos="";
        this.affichAge="";
        this.affichStock="";

      })


     // this.listProduiLike=this.tab1[0];

    }

    qteProdFront:any;

    async rechercheProdui(){

      this.api.afficheProduitRech(this.nomProduit).subscribe(data=>{
        this.rep=data;

        this.repRech=this.rep['data'];

        this.tab=this.repRech[0];

        this.listInfo=this.tab[0];

        this.idProd=this.listInfo.matricule;
        this.affichNom=this.listInfo.nom;
        this.affichPu=parseInt(this.listInfo.puu);
        this.affichExp=this.listInfo.date_exp;
        this.affichCat=this.listInfo.categorie;
        this.affichTraite=this.listInfo.traite;
        this.affichAnti=this.listInfo.anti;
        this.affichPos=this.listInfo.posologie;
        this.affichAge=this.listInfo.age_utilisation;
        this.affichStock=this.listInfo.stock_p;

        if(this.permissionVerifStock==true){

          this.qteProdFront=this.affichStock;

        }
        else{

          this.qteProdFront="";

        }


        this.qtProd="";

        this.foc=document.getElementById('textqte');

        if(this.foc){
          this.foc.focus()
        }

      })

    }

    prefixProduiRav:any="";
    idMisAJour:any="";
    listProduiLikeRav:any=[];


    nomMisAJour:any="";
    prixMisAJour:any=0;

    async selectLikeRav(){

      this.api.getProduitLIke(this.prefixProduiRav).subscribe(data=>{

        this.rep=data;

        this.tab=this.rep['data'];

        this.listProduiLikeRav=this.tab[0];

        this.nomMisAJour="";
        this.prixMisAJour=0;
        this.idMisAJour=""

        this.stockFixe=0;
        this.stockVariable=0;
        this.idInitialiser="";

      })

      //const req=await axios.get('http://'+this.server+'/Pharma/produit/like/'+this.prefixProduiRav);

      //this.rep=req.data;

      //this.tab=this.rep['data'];

      //this.listProduiLikeRav=this.tab[0];





     // this.listProduiLike=this.tab1[0];

    }

    prefixProduiRavProx:any="";
    listProduiLikeRavProx:any=[];

    async selectLikeRavPro(){

      this.api.getProduitLIke(this.prefixProduiRavProx).subscribe(data=>{

        this.rep=data;

        this.tab=this.rep['data'];

        this.listProduiLikeRavProx=this.tab[0];

        this.nomMisAJour="";
        this.prixMisAJour=0;
        this.idMisAJour=""

        this.nomRavProx="";
        this.prixRavProx=0;
        this.idRavPro="";
        this.stockRavPro=0;


      })


      //const req=await axios.get('http://'+this.server+'/Pharma/produit/like/'+this.prefixProduiRavProx);

      //this.rep=req.data;

      //this.tab=this.rep['data'];

      //this.listProduiLikeRavProx=this.tab[0];





     // this.listProduiLike=this.tab1[0];

    }

    nomProduitRav:any="";
    listInfoRav:any=[];
    dataExp:any="";

    ann:any="";
    mois:any="";
    jour:any="";

    async rechercheProduiRav(){

      this.api.afficheProduitRech(this.nomProduitRav).subscribe(data=>{
        this.rep=data;

        this.repRech=this.rep['data'];

        this.tab=this.repRech[0];

        this.listInfoRav=this.tab[0];

        this.nomMisAJour=this.listInfoRav.nom;
        this.prixMisAJour=parseInt(this.listInfoRav.puu);
        this.idMisAJour=this.listInfoRav.matricule;
        this.dataExp=this.listInfoRav.date_exp;


      })

    }

    listInfoInitial:any=[];

    stockFixe:any="";
    stockVariable:any="";
    idInitialiser:any="";
    qteMinorer:any=0;

    totVenduMin:any=0;

    async rechercheInitialiser(){

      this.api.afficheProduitRech(this.nomProduitRav).subscribe(data=>{
        this.rep=data;

        this.repRech=this.rep['data'];

        this.tab=this.repRech[0];

        this.listInfoInitial=this.tab[0];

        this.stockFixe=this.listInfoInitial.stock;
        this.stockVariable=this.listInfoInitial.stock_p;
        this.idInitialiser=this.listInfoInitial.matricule;

      })

      this.api.totVenduMin(this.nomProduitRav).subscribe(data=>{

        this.totVenduMin=data.data;

      })

    }

    nomProduitRavPro:any="";
    listInfoRavProx:any=[];

    idRavPro:any="";
    prixRavProx:any=0;
    nomRavProx:any="";
    qteRavPro:any=0;
    stockRavPro:any=0;

    rechercheProduiRavPro(){

      this.api.afficheProduitRech(this.nomProduitRavPro).subscribe(data=>{
        this.rep=data;

        this.repRech=this.rep['data'];

        this.tab=this.repRech[0];

        this.listInfoRavProx=this.tab[0];

        this.nomRavProx=this.listInfoRavProx.nom;
        this.prixRavProx=parseInt(this.listInfoRavProx.puu);
        this.idRavPro=this.listInfoRavProx.matricule;
        this.stockRavPro=this.listInfoRavProx.stock_p;

      })

    }

    rechercheProduiRavTous(){

      this.api.afficheProduitFantome(this.nomProduitRavPro).subscribe(data=>{
        this.rep=data;

        this.repRech=this.rep['data'];

        this.tab=this.repRech[0];

        this.listInfoRavProx=this.tab[0];

        this.nomRavProx=this.listInfoRavProx.nom;
        this.prixRavProx=parseInt(this.listInfoRavProx.puu);
        this.idRavPro=this.listInfoRavProx.matricule;
        this.stockRavPro=this.listInfoRavProx.stock_p;

      })

    }



    async deconnexion(){

      //const req=await axios.delete('http://'+this.server+'/Pharma/deconnexion/'+this.id);

      this.api.deconnexion(this.id).subscribe(data=>{
        this.rep=data;

        this.etatReq=this.rep.data;

        this.etatReq=this.etatReq.etat;

        if(this.etatReq==true){

          alert("Bye! à plus tard!!");

          document.getElementById('divConn')!.style.display="block";
          document.getElementById('divApp')!.style.display="none";

        }

      })

    }


    async cloturedService(){

      //const req=await axios.delete('http://'+this.server+'/Pharma/sessionClosed/'+this.id);

      this.api.closingDay(this.id).subscribe(data=>{

        this.rep=data;

        this.etatReq=this.rep.data;

        this.etatReq=this.etatReq.etat;

        if(this.etatReq==true){

          alert("Tu viens de cloturer le service du jour avec succes...A demain ! Bye !");

          document.getElementById('divConn')!.style.display="block";
          document.getElementById('divApp')!.style.display="none";

        }
      })

    }

    tabClientCharger:any;
    prefixClientProforma:any="";
    ClientProforma:any="";

    async chargerProforma(){

      this.api.chargeProforma(this.prefixClientProforma).subscribe(data=>{

        this.data=data;
        this.data1=data.data;
        this.tabClientCharger=this.data1[0]

      })
    }

    async getUserPharnma(){

      this.api.getUser().subscribe(data=>{

        this.data=data;
        this.data1=data.data;
        this.tabClientCharger=this.data1[0]

      })
    }

    net:any=0;

    async afficheProforma(){

      this.api.afficheProforma(this.ClientProforma).subscribe(data=>{

        this.data=data;
        this.data1=data.data;
        this.tabProfoCharger=this.data1[0]

        this.tableCoupon=[];

        this.i=0;
        this.net=0;

        this.tabProfoCharger.forEach(ligne=>{

          this.net=this.net+ligne.pt;

          const dataProf:any={

            num:this.i+1,
            ID_Produit:ligne.id_prod,
            nom:ligne.nom,
            PU:Math.round(ligne.pu),
            Qte:Math.round(ligne.qt),
            PT:Math.round(ligne.pt),
            id_travailleur:this.id,
            Nom_client:"-"

          }

          this.tableCoupon.push(dataProf);

          this.i=this.i+1;

          this.netPayer=parseInt(this.net);

    })

      })

    }

    nomPriseChargeVente:any="";
    tabPriseChargeChargerVente:any=[];

    async chargerPriseCharge(){

      this.api. chargerPriseCharge(this.nomPriseChargeVente).subscribe(data=>{

        this.tabPriseChargeChargerVente=data.data

      })
    }

    dataProformaPush:{[key:string]:any}={};
    nomClientProforma:any="";

    titreFac:any="";
    netTicker:any=0;

    clientTicker:any="";

    saveProforma(){


        if(this.tableCoupon.length >0 && this.nomClientProforma !=""){

          this.i=0;

          this.tableCoupon.forEach(item=>{

            const dataK={
              id_prod:item.ID_Produit,
              qt:item.Qte,
              nom_client:this.nomClientProforma
            }

            this.dataProformaPush[this.i]=dataK;

            this.i=this.i+1;

            })

            this.dataProformaPush['nbr']=this.tableCoupon.length;

            this.dataProformaPush['bd']=this.api.bd;

          this.api.saveProforma(this.dataProformaPush).subscribe(data=>{

            this.data=data;
            this.etatConn=data.etat;

            if(this.etatConn==true){

              alert("Felicitation !! Souche etablie avec succes !");


              this.titreFac="PREFACT : "

              //this.dataTabImpessio=this.tableCoupon;

              this.dataTabImpessio=[]

              this.tableCoupon.forEach(item=>{

                if(item.nom.length<8){

                  this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom,PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

                  this.dataTabImpessio.push(this.dataOPT)

                }
                else{

                  this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom.substring(0,5)+'..',PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

                  this.dataTabImpessio.push(this.dataOPT)
                }


              })



              this.netTicker=this.netPayer;

              this.dateHeureOpe='2025-05-05 20:25:90';

              this.idFac=this.idFac+1;

              this.clientTicker=this.nomClientProforma;


              this.tableCoupon=[];
              this.netPayer=0;

              this.nomClientProforma="";
            }
            else{

              alert("Error survenue !")

            }

          })
        }
        else{

          alert("data incomplet, veuillez composer correctement le coupon et renseigner le nom du client SVP!!");

        }



    }

    dataPush:{[key:string]:any}={};

    dataPushPresciption:{[key:string]:any}={};

    nomClientAchat:any="";

    nomClientAchatABonne:any="";

    nomClient:any="";

    etatAchat:any=0;

    etatConn2:any=false;

    docteurConsult:any="";

    dateOpe:any='0000-00-00';

    dataOPT:any={}

    async valideCouponSimple(){

      this.dataPushPresciption={};
      this.dataPush={};

      this.etatConn=false;
      this.etatConn2=false;

      if(this.etatAchat==0){

        this.nomClient=this.nomClientAchat;

      }
      else{

        this.nomClient=this.nomClientAchatABonne;

      }

      this.i=0;

      this.tableCoupon.forEach(item=>{

      item.Nom_client=this.nomClient;
      item.id_travailleur=this.id;

      this.dataPush[this.i]=item;

      this.i=this.i+1;

      })

      this.dataPush['nbr']=this.tableCoupon.length;

      this.dataPush['bd']=this.api.bd;

      if(this.etatAchat==0){

        this.api.validateCouponSImple(this.dataPush).subscribe(data=>{

          this.data=data;
          this.etatConn=data.etat;

          if(this.etatConn==true){

            alert("Produit vendu (s) avec succes !");


            this.titreFac="FACT : "

            //this.dataTabImpessio=this.tableCoupon;


            this.dataTabImpessio=[]

            this.tableCoupon.forEach(item=>{

          if(item.nom.length<8){

            this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom,PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

            this.dataTabImpessio.push(this.dataOPT)

          }
          else{

            this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom.substring(0,5)+'..',PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

            this.dataTabImpessio.push(this.dataOPT)
          }

            })


            this.netTicker=this.netPayer;

            this.dateHeureOpe='2025-05-05 20:25:90';

            this.idFac=this.idFac+1;

            this.clientTicker=this.nomClient;


            this.docteurConsult="";
            this.nomClientAchatABonne="";
            this.nomPriseChargeVente="";
            this.nomClientAchat="";

            document.getElementById('msgBox')!.style.display="none";

            document.getElementById('divCadreBas')!.style.display="inline-block";
            document.getElementById('divBasFin')!.style.display="inline-block";

            this.tableCoupon=[];
            this.netPayer=0;
          }
          else{

            alert("Error survenue ! veuillez consulter le detail ,NB: consulter le JOURNAL avant de ressayer ")

          }

        })


      }
      else{

          this.api.validateCouponSImple(this.dataPush).subscribe(data=>{

          this.data=data;
          this.etatConn=data.etat;

          this.dateOpe=data.datx;

          if(this.etatConn==true){

              const dataK={

                id_prise:this.nomClient,
                id_achat:this.dateOpe,
                docteur:this.docteurConsult
              }

              this.dataPushPresciption['data']=dataK;

              this.dataPushPresciption['bd']=this.api.bd;


            this.api.validatePrescription(this.dataPushPresciption).subscribe(data=>{

              this.data=data;
              this.etatConn2=data.etat;

              if(this.etatConn2==true){

                alert("Produit vendu (s) avec succes !");

                this.tableCoupon=[];
                this.netPayer=0;
              }
              else if(this.etatConn2==false){

                alert("Error !");

                alert("ATTENTION!! les produit sont bien vendu (s) mais le probleme est survenu lors de la sauvegarde du patient");


              }
              else{

                alert("Produit vendus mais a BASE D ERREUR, veuillez verifier dans le journal avant de ressayer !");

              }

            })

          }
          else if(this.etatConn==false){

            alert("ERROR! ")

          }
        })

      }

    }

    tabPriseChargeCharger:any=[]

    chargerCouponClient(){

      this.api.validateCouponSImple(this.dataPush).subscribe(data=>{

        this.data=data;
        this.data1=data.data;
        this.tabPriseChargeCharger=this.data1[0]

      })

    }

    // AFFICHAGE

    dataAChat:{ID_Produit:string,nom:string,PU:number,Qte:number,PT:number,Nom_client:string,Dates:string,Dats_id:string,id_travailleur:string}[]=[];

    datanew:any=[];

    dateHeureOpe:any="";


    async afficheAchatClient(){

      this.dataAChat=[];

      if(this.typeMappage==1){

        this.api.afficheAchatNowIdTravClient(this.clientJournal.value,this.id).subscribe(data=>{
        this.data=data;
        this.data1=data.data;
        this.dataAChat=this.data1[0]

        this.netJournal=0

        this.dataAChat.forEach(item=>{

        this.netJournal=this.netJournal+item.PT;

        })

        })
      }
      else{

        this.api.afficheAchatNowClient(this.clientJournal).subscribe(data=>{
        this.datanew=data;
        this.data1=data.data;
        this.dataAChat=this.data1[0];

      })

    }


  }

  k:any=1;

  async calculeJounal(){

    this.netJournal=0

    this.dataAChat.forEach(item=>{

      this.netJournal=this.netJournal+item.PT;

      this.dateHeureOpe=item.Dats_id;

      this.clientTicker=item.Nom_client;


    })

    this.k=this.k+1;

    this.idFac= this.k;

    this.titreFac="FACT : "

    //this.dataTabImpessio=this.dataAChat;

    this.dataTabImpessio=[]

    this.dataAChat.forEach(item=>{

      if(item.nom.length<8){

        this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom,PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

        this.dataTabImpessio.push(this.dataOPT)

      }
      else{

        this.dataOPT={ID_Produit:item.ID_Produit,nom:item.nom.substring(0,5)+'..',PU:item.PU,Qte:item.Qte,PT:item.PT,id_travailleur:item.id_travailleur,Nom_client:item.Nom_client}

        this.dataTabImpessio.push(this.dataOPT)
      }




    })

    this.netTicker=this.netJournal;

    this.idFac=this.idFac+1;

    //this.clientTicker=this.nomClientProforma;

  }

  async afficheAchatDate(){

    this.dataAChat=[];

      this.api.afficheAchatDateTravId(this.id,this.dateJournal).subscribe(data=>{
      this.data=data;
      this.data1=data['data'];
      this.dataAChat=this.data1[0];

      })
  }

  InfoImpression:any=[];

  async getImpression(){

    this.api.getInfoImpression().subscribe(data=>{

      this.InfoImpression=data.data;


      })
  }

  async afficheAchatIdProduit(){

    this.dataAChat=[];

    if(this.typeMappage==1){

      this.api.afficheAchatNowIdProduitIdTrav(this.idProdJournal,this.id).subscribe(data=>{
      this.data=data;
      this.data1=data.data;
      this.dataAChat=this.data1[0]

      })
    }
    else{

        this.api.afficheAchatNowIdProduit(this.idProdJournal).subscribe(data=>{
        this.data=data;
        this.data1=data.data;
        this.dataAChat=this.data1[0]

        })
    }

  }

  tabMotifClient:any;

  affiMotif(){

    this.api.getMotif(this.id).subscribe(data=>{
      this.data=data;
      this.data1=data.data;
      this.tabMotifClient=this.data1[0]

      })

  }

  controleMotif(){

    if(this.motifValue=="Retournement Produit"){

      document.getElementById('produitMotif')!.style.display="block";
      document.getElementById('montantMotif')!.style.display="block";
      document.getElementById('detailMotif')!.style.display="block";

      this.infoMotif=" ** Ref Produit "+this.nomProduit;

    }
    else if(this.motifValue=="Sorti d'argent"){

      document.getElementById('produitMotif')!.style.display="none";
      document.getElementById('montantMotif')!.style.display="block";
      document.getElementById('detailMotif')!.style.display="block";

      this.infoMotif="";

    }

    else if(this.motifValue=="Rupture Stock"){

      document.getElementById('produitMotif')!.style.display="block";
      document.getElementById('montantMotif')!.style.display="none";
      document.getElementById('detailMotif')!.style.display="block";

      this.infoMotif=" ** Ref Produit "+this.nomProduit;

      this.montantMotif=0;

    }

    else if(this.motifValue=="Autres"){

      document.getElementById('produitMotif')!.style.display="none";
      document.getElementById('montantMotif')!.style.display="block";
      document.getElementById('detailMotif')!.style.display="block";

      this.infoMotif="";

    }

  }

  etatConn:any;
  repinfo:any;
  infoMotif:any="";



  dataMotif:{[key:string]:any}={};


  saveMotif(){

    try {

      const dat={

      nom_motif:this.motifValue,
      detail_motif:this.detailMotif+ this.infoMotif,
      montant:parseInt(this.montantMotif),
      id_trav:this.id
  }

    this.dataMotif['data']=dat

    this.dataMotif['bd']=this.api.bd


     this.api.createMotif(this.dataMotif).subscribe(data=>{
      this.repinfo=data;
      this.etatConn=this.repinfo.etat;

      if(this.etatConn=="True"){

        alert('Effectué !')

        this.motifValue="";
        this.detailMotif="";
        this.montantMotif=0;

      }
      else{

        alert('Echoué ! veuillez réessayer plus tard');

        }

      })



      this.affiMotif();

  }
  catch{

    alert("error");

  }

  }

    changeDescriptionSetting(){

       if(this.typeAffich=="OUI"){
          document.getElementById('descriptionSetting1')!.style.display="block";
          document.getElementById('descriptionSetting2')!.style.display="block";
          document.getElementById('descriptionSetting3')!.style.display="block";

          document.getElementById('descriptionSetting4')!.style.display="block";
          document.getElementById('descriptionSetting5')!.style.display="block";
          document.getElementById('descriptionSetting6')!.style.display="block";
          document.getElementById('descriptionSetting7')!.style.display="block";
          document.getElementById('descriptionSetting8')!.style.display="block";
       }
       else{
        document.getElementById('descriptionSetting1')!.style.display="none";
        document.getElementById('descriptionSetting2')!.style.display="none";
        document.getElementById('descriptionSetting3')!.style.display="none";

        document.getElementById('descriptionSetting4')!.style.display="none";
        document.getElementById('descriptionSetting5')!.style.display="none";
        document.getElementById('descriptionSetting6')!.style.display="none";
        document.getElementById('descriptionSetting7')!.style.display="none";
        document.getElementById('descriptionSetting8')!.style.display="none";
       }

    }

    tirerMenu(){

      this.getImpression();

      this.getpermissionVerificateurStock();

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      if(this.etat==0){

        document.getElementById('menu1')!.style.display="none";
        document.getElementById('menu3')!.style.display="inline-block";

        document.getElementById('menu3')!.style.width="80%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="100%";


        this.etat=1;
      }
      else {

        document.getElementById('menu1')!.style.display="inline-block";
        document.getElementById('menu3')!.style.display="none";

        document.getElementById('menu3')!.style.width="20%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="70px";

        this.etat=0;
      }

    }


    chargePageVente(){

      this.getImpression();

      this.getpermissionVerificateurStock();

      this.typeOpAbonne="";

      this.getImpression()

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      if(this.etatmobile < 600){

        document.getElementById('pageVente')!.style.display="block";
        document.getElementById('pageJournal')!.style.display="none";
        document.getElementById('pageMode')!.style.display="none";
        document.getElementById('pageSetting')!.style.display="none"

        document.getElementById('menu1')!.style.display="inline-block";
        document.getElementById('menu3')!.style.display="none";

        document.getElementById('menu3')!.style.width="20%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="70px";

        this.etat=0;


      }
      else{
        document.getElementById('pageVente')!.style.display="block";
        document.getElementById('pageJournal')!.style.display="none";
        document.getElementById('pageMode')!.style.display="none";
        document.getElementById('pageSetting')!.style.display="none"
      }


    }

    chargePageJournal(){

      this.getImpression();

      this.getpermissionVerificateurStock();

      this.typeOpAbonne="";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      if(this.etatmobile < 600){

        document.getElementById('pageVente')!.style.display="none";
        document.getElementById('pageJournal')!.style.display="block";
        document.getElementById('pageMode')!.style.display="none";
        document.getElementById('pageSetting')!.style.display="none"

        document.getElementById('menu1')!.style.display="inline-block";
        document.getElementById('menu3')!.style.display="none";

        document.getElementById('menu3')!.style.width="20%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="70px";

        this.etat=0;


    }

    else{

      document.getElementById('pageVente')!.style.display="none";
      document.getElementById('pageJournal')!.style.display="block";
      document.getElementById('pageMode')!.style.display="none";
      document.getElementById('pageSetting')!.style.display="none"

    }

  }



    chargePageMode(){

      this.getImpression();

      this.getpermissionVerificateurStock();

      this.typeOpAbonne="";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      if(this.etatmobile < 600){

        document.getElementById('pageVente')!.style.display="none";
        document.getElementById('pageJournal')!.style.display="none";
        document.getElementById('pageMode')!.style.display="block";
        document.getElementById('pageSetting')!.style.display="none";

        document.getElementById('menu1')!.style.display="inline-block";
        document.getElementById('menu3')!.style.display="none";

        document.getElementById('menu3')!.style.width="20%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="70px";

        this.etat=0;
    }
    else{
        document.getElementById('pageVente')!.style.display="none";
        document.getElementById('pageJournal')!.style.display="none";
        document.getElementById('pageMode')!.style.display="block";
        document.getElementById('pageSetting')!.style.display="none";

    }
  }


    chargePageSetting(){

      this.getImpression();

      this.getpermissionVerificateurStock();

      this.typeOpAbonne="";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      this.chargerTaux();

      if(this.etatmobile < 600){

        document.getElementById('pageVente')!.style.display="none";
        document.getElementById('pageJournal')!.style.display="none";
        document.getElementById('pageMode')!.style.display="none";
        document.getElementById('pageSetting')!.style.display="block"

        document.getElementById('menu1')!.style.display="inline-block";
        document.getElementById('menu3')!.style.display="none";

        document.getElementById('menu3')!.style.width="20%";
        document.getElementById('menu3')!.style.height="100%";

        document.getElementById('menu0')!.style.width="100%";
        document.getElementById('menu0')!.style.height="70px";

        this.etat=0;
    }
    else{
      document.getElementById('pageVente')!.style.display="none";
      document.getElementById('pageJournal')!.style.display="none";
      document.getElementById('pageMode')!.style.display="none";
      document.getElementById('pageSetting')!.style.display="block"


    }
  }

    tireCoupon(){

      this.typeOpAbonne="";

      if(this.etatCoupon==0){


        document.getElementById('pageAjout')!.style.display="none";
        document.getElementById('pageAMiseAJour')!.style.display="none";
        document.getElementById('pageRavitaillement')!.style.display="none";
        document.getElementById('pageAInitierStock')!.style.display="none";
        document.getElementById('pageSignaler')!.style.display="none";
        document.getElementById('pageAbonne')!.style.display="none";
        document.getElementById('pageAbonne1')!.style.display="none";

       // document.getElementById('divQte')!.style.display="none";



        if(this.etatmobile < 600){

          document.getElementById('divCadreBas')!.style.height="auto";
          document.getElementById('cadre')!.style.height="72px";

        }
        else{

          document.getElementById('divCadreBas')!.style.height="700px";
          document.getElementById('cadre')!.style.height="72px";

        }

        this.etatCoupon=1;
      }
      else{

        document.getElementById('pageAjout')!.style.display="none";
        document.getElementById('pageAMiseAJour')!.style.display="none";
        document.getElementById('pageRavitaillement')!.style.display="none";
        document.getElementById('pageAInitierStock')!.style.display="none";
        document.getElementById('pageSignaler')!.style.display="none";
        document.getElementById('pageAbonne')!.style.display="none";
        document.getElementById('pageAbonne1')!.style.display="none";

        //document.getElementById('divQte')!.style.display="block";

        document.getElementById('divCadreBas')!.style.height="400px";
        document.getElementById('cadre')!.style.height="400px";

        this.etatCoupon=0;

      }

    }



    affichaPageAjout(){
      document.getElementById('pageAjout')!.style.display="block";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

    }
    affichaPageMiseJour(){
      document.getElementById('pageAMiseAJour')!.style.display="block";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";


    }

    affichaPageRavitaillement(){
      document.getElementById('pageRavitaillement')!.style.display="block";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";


    }


    affichaPageGestionAbonnes(){

      document.getElementById('pageAbonne')!.style.display="block";
      document.getElementById('pageAbonne1')!.style.display="none";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";


    }

    affichaPageGestionPrescription(){

      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="block";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";


    }

    affichaPageSiganler(){
      document.getElementById('pageSignaler')!.style.display="block";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";


      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      this.nomProduit="";


      this.affiMotif();

    }

    affichaPageInitierStock(){

      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageSetting')!.style.display="none";

      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";

      document.getElementById('pageAInitierStock')!.style.display="block";



    }

    retourSetting(){
      document.getElementById('pageAjout')!.style.display="none";
      document.getElementById('pageAMiseAJour')!.style.display="none";
      document.getElementById('pageRavitaillement')!.style.display="none";
      document.getElementById('pageSignaler')!.style.display="none";
      document.getElementById('pageAInitierStock')!.style.display="none";
      document.getElementById('pageAbonne')!.style.display="none";
      document.getElementById('pageAbonne1')!.style.display="none";



      document.getElementById('pageSetting')!.style.display="block";

      this.typeOpAbonne="";

    }

    dataControlerValidate:any;
    dataControlTab:any;

    dataEchec:any=[]

    dataActive:any;

    confirmerCoupon(){

      this.api.verifAutorisation(this.id).subscribe(data=>{

        this.dataActive=data;

        if(this.dataActive==true){

          if(this.tableCoupon.length<1){

            alert("Coupon est vide !! tu sais...")

          }
          else{

              this.dataControlerValidate={};

              this.i=0;

              this.tableCoupon.forEach(item=>{

              const dataK={
                id_prod:item.ID_Produit,
                qt:item.Qte
              }

              this.dataControlerValidate[this.i]=dataK;

              this.i=this.i+1;

              })

              this.dataControlerValidate['nbr']=this.tableCoupon.length;

              this.dataControlerValidate['bd']=this.api.bd;

              this.etatConn=false;

              this.dataEchec=[];

            this.api.controleurValidationCoupon(this.dataControlerValidate).subscribe(data=>{

              this.data=data;
              this.dataControlTab=data.data;
              this.dataEchec=this.dataControlTab.echec;

              if(this.dataEchec.length<=0){

                document.getElementById('msgBox')!.style.display="block";
                document.getElementById('divCadreBas')!.style.display="none";
                document.getElementById('divBasFin')!.style.display="none";

              }
              else{

                alert("ERROR! Le controlleur de correspondance a dectécté le changement explicite de données avant leurs cheminements, NB Veuillez revoir leur QUANTITES et ressayer")

                alert(this.dataEchec);
              }

            });



          }

        }
        else{

          alert("Impossible de continuer !! car tu n'as plus d'autorisation, veuillez consulter votre Gestionnaire !")

          document.getElementById('divConn')!.style.display="block";
          document.getElementById('divApp')!.style.display="none";

        }

      })



    }

    confirmerCouponAnnuler(){

      document.getElementById('msgBox')!.style.display="none";
      document.getElementById('divCadreBas')!.style.display="inline-block";
      document.getElementById('divBasFin')!.style.display="inline-block";

    }

    confirmerProfo(){

      document.getElementById('msgBoxProfo')!.style.display="block";
      document.getElementById('divCadreBas')!.style.display="none";
      document.getElementById('divBasFin')!.style.display="none";

    }

    proformaCouponAnnuler(){

      document.getElementById('msgBoxProfo')!.style.display="none";
      document.getElementById('divCadreBas')!.style.display="inline-block";
      document.getElementById('divBasFin')!.style.display="inline-block";

    }

    etatChangeClient:any=0;

    changeModeClient(){

      if(this.etatChangeClient==0){


        document.getElementById('divMidClient1Val')!.style.display="none";
        document.getElementById('divMidClient2Val')!.style.display="block";

        this.etatChangeClient=1;

        this.etatAchat=1;

      }
      else{

        document.getElementById('divMidClient1Val')!.style.display="block";
        document.getElementById('divMidClient2Val')!.style.display="none";

        this.etatAchat=0;
        this.etatChangeClient=0
      }
    }

    etatChangeProfo:any=0;

    changeModeProforma(){

      if(this.etatChangeProfo==0){

        document.getElementById('divMidClient1')!.style.display="none";
        document.getElementById('divMidClient2')!.style.display="block";

        document.getElementById('btnPref1')!.style.display="block";
        document.getElementById('btnPref2')!.style.display="none";


        this.etatChangeProfo=1

      }
      else{

        document.getElementById('divMidClient1')!.style.display="block";
        document.getElementById('divMidClient2')!.style.display="none";

        document.getElementById('btnPref1')!.style.display="inline-block";
        document.getElementById('btnPref2')!.style.display="inline-block";
        this.etatChangeProfo=0
      }
    }

    lireTauxChange(){
      alert(this.taux+" USD");
    }

    idFac:any=0;

    ifac:any=0;

    netFact:any=0;

    tabImpression:any=[];

    j:number=0

    printeJOurna(){

      document.getElementById('pageImpression')!.style.display="block";

      window.print();

      setTimeout(()=>{

        document.getElementById('pageImpression')!.style.display="none";

      },5000)

    }

    printJournalEssaieei(){

      const contentPrint=""

      // document.getElementById('pageImpression').innerHTML;

      const printWindow=window.open('','_blank');

      if (printWindow){

        printWindow.document.open();

        printWindow.document.write('<!DOCTYPE html> <html> <head> <style> .titreFac1{font-size:12px;font-weight: bold;color:black;text-align:center} .titreFac2{font-size:11px;font-weight: bold;color:black; text-align:center} .logo{width: 30%;height: 50px;border-radius:50%;margin-left: 30%;box-shadow: 5px 5px 2px gray;}.divHaut{width:100%;height:30px;}.divHaut1{width:55%;height:100%;display:inline-block;}.divHaut2{width:38%;height:100%;display:inline-block;}.titreFac3{font-size:10px;font-weight: bold;color:black; text-align:left} .divBas{width:100%;height:80px;border:solid 2px black} .divBas1{width:40%;height:100%;border:solid 2px black;display:inline-block} .divBas2{width:50%;height:100%;border:solid 2px black;display:inline-block} .divBas21{width:100%;height:45%;border:solid 2px black} .divBas22{width:100%;height:45%;border:solid 2px black} .divBas21A{width:40%;height:100%;border:solid 2px black; display:inline-block}.divBas21B{width:45%;height:100%;border:solid 2px black; display:inline-block} th{background-color:gray;font-size:12px;font-weight:bold} td{font-size:11px;font-weight:bold} </style> </head> <body> <p class="titreFac1">NOM DE LA PHARMACIE</p>  <p class="titreFac2">RCCM K004/BN/5005 2024 </p> <p class="titreFac2">Kin-Gombe/OLD-GATE </p> <p class="titreFac2">Tél +243 970494397 </p> ${{prodDD | json}} <img src="assets/images/logoPharma.jpeg" class="logo"> <div class="divHaut"> <div class="divHaut1"><p class="titreFac3">TRAV</p></div> <div class="divHaut2"><p class="titreFac3">FACTURE N°</p></div></div> <hr> <table border="2px"> <th>ID</th>  <th>NOM</th>  <th>PU</th>  <th>QTE</th>  <th>PT</th> <tr> <td>0015</td> <td>Paracetamole</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> <tr> <td>00000015</td> <td>Ubucap</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> </table> <hr>  <div class="divBas"> <div class="divBas1"> <p class="titreFac2">WWW.CTI.com </p> <p class="titreFac2"> DATE HEURE </p></div> <div class="divBas2"> <div class="divBas21"> <div class="divBas21A"> <p class="titreFac2">NET</p> </div> <div class="divBas21B"> <p class="titreFac2">15500</p> </div> </div> <div class="divBas22"> <div class="divBas21A"><p class="titreFac2">TVA</p></div> <div class="divBas21B"> <p class="titreFac2">0.05</p> </div> </div> </div> </div> </body>  </html>');

        printWindow.document.close();

        printWindow.onload=()=>{

          printWindow.focus();
          printWindow.print();

        }


      }

    }

    printeVente(){

      this.j=0;

      this.netFact=0;


      this.netJournal=0

      this.dataAChat.forEach(item=>{

        this.netJournal=this.netJournal+item.PT;

        this.j=this.j+1;

      })

      for(let i=0;i<this.dataAChat.length-1;i++){

        this.netJournal=this.netJournal+this.dataAChat[i].PT;

      }

      this.netFact=this.netJournal;

      this.idFac=this.netJournal/2;

      if(this.dataAChat.length <= this.j){

        document.getElementById('pageImpression')!.style.display="block";

        window.print();

        document.getElementById('pageImpression')!.style.display="none";

        alert(this.netJournal)

      }

    }

    etatImprioProf:any=0;

    impressioMode(){

      this.printeJOurna();


    }

    printePrefo(){

      this.j=0;

      this.netFact=0;


      this.netJournal=0

      this.dataAChat.forEach(item=>{

        this.netJournal=this.netJournal+item.PT;

        this.j=this.j+1;

      })

      for(let i=0;i<this.dataAChat.length-1;i++){

        this.netJournal=this.netJournal+this.dataAChat[i].PT;

      }

      this.netFact=this.netJournal;

      this.idFac=this.netJournal/2;

      if(this.dataAChat.length <= this.j){

        document.getElementById('pageImpression')!.style.display="block";

        window.print();

        document.getElementById('pageImpression')!.style.display="none";

        alert(this.netJournal)

      }

    }

    imprimerFactureNew(){

      const contentPrint=""

      // document.getElementById('pageImpression').innerHTML;

      const printWindow=window.open('','_blank');


      if (printWindow){

        printWindow.document.open();

        printWindow.document.write('<!DOCTYPE html> <html> <head> <style> .titreFac1{font-size:12px;font-weight: bold;color:black;text-align:center} .titreFac2{font-size:11px;font-weight: bold;color:black; text-align:center} .logo{width: 30%;height: 50px;border-radius:50%;margin-left: 30%;box-shadow: 5px 5px 2px gray;}.divHaut{width:100%;height:30px;}.divHaut1{width:55%;height:100%;display:inline-block;}.divHaut2{width:38%;height:100%;display:inline-block;}.titreFac3{font-size:10px;font-weight: bold;color:black; text-align:left} .divBas{width:100%;height:80px;border:solid 2px black} .divBas1{width:40%;height:100%;border:solid 2px black;display:inline-block} .divBas2{width:50%;height:100%;border:solid 2px black;display:inline-block} .divBas21{width:100%;height:45%;border:solid 2px black} .divBas22{width:100%;height:45%;border:solid 2px black} .divBas21A{width:40%;height:100%;border:solid 2px black; display:inline-block}.divBas21B{width:45%;height:100%;border:solid 2px black; display:inline-block} th{background-color:gray;font-size:12px;font-weight:bold} td{font-size:11px;font-weight:bold} </style> </head> <body> <p class="titreFac1">NOM DE LA PHARMACIE</p>  <p class="titreFac2">RCCM K004/BN/5005 2024 </p> <p class="titreFac2">Kin-Gombe/OLD-GATE </p> <p class="titreFac2">Tél +243 970494397 </p> ${{prodDD | json}} <img src="assets/images/logoPharma.jpeg" class="logo"> <div class="divHaut"> <div class="divHaut1"><p class="titreFac3">TRAV</p></div> <div class="divHaut2"><p class="titreFac3">FACTURE N°</p></div></div> <hr> <table border="2px"> <th>ID</th>  <th>NOM</th>  <th>PU</th>  <th>QTE</th>  <th>PT</th> <tr> <td>0015</td> <td>Paracetamole</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> <tr> <td>00000015</td> <td>Ubucap</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> </table> <hr>  <div class="divBas"> <div class="divBas1"> <p class="titreFac2">WWW.CTI.com </p> <p class="titreFac2"> DATE HEURE </p></div> <div class="divBas2"> <div class="divBas21"> <div class="divBas21A"> <p class="titreFac2">NET</p> </div> <div class="divBas21B"> <p class="titreFac2">15500</p> </div> </div> <div class="divBas22"> <div class="divBas21A"><p class="titreFac2">TVA</p></div> <div class="divBas21B"> <p class="titreFac2">0.05</p> </div> </div> </div> </div> </body>  </html>');

        printWindow.document.close();

        printWindow.onload=()=>{

          printWindow.focus();
          printWindow.print();

        }


      }
    }


    imprimerFacture(){


      const prodDD="junior";

      document.getElementById('pageServer')!.style.display="none";


      const contentPrint=""

      // document.getElementById('pageImpression').innerHTML;

      const printWindow=window.open('','_blank','width=80mm ,height=200mm');

      printWindow?.document.write('<!DOCTYPE html> <html> <head> <style> .titreFac1{font-size:12px;font-weight: bold;color:black;text-align:center} .titreFac2{font-size:11px;font-weight: bold;color:black; text-align:center} .logo{width: 30%;height: 50px;border-radius:50%;margin-left: 30%;box-shadow: 5px 5px 2px gray;}.divHaut{width:100%;height:30px;}.divHaut1{width:55%;height:100%;display:inline-block;}.divHaut2{width:38%;height:100%;display:inline-block;}.titreFac3{font-size:10px;font-weight: bold;color:black; text-align:left} .divBas{width:100%;height:80px;border:solid 2px black} .divBas1{width:40%;height:100%;border:solid 2px black;display:inline-block} .divBas2{width:50%;height:100%;border:solid 2px black;display:inline-block} .divBas21{width:100%;height:45%;border:solid 2px black} .divBas22{width:100%;height:45%;border:solid 2px black} .divBas21A{width:40%;height:100%;border:solid 2px black; display:inline-block}.divBas21B{width:45%;height:100%;border:solid 2px black; display:inline-block} th{background-color:gray;font-size:12px;font-weight:bold} td{font-size:11px;font-weight:bold} </style> </head> <body> <p class="titreFac1">NOM DE LA PHARMACIE</p>  <p class="titreFac2">RCCM K004/BN/5005 2024 </p> <p class="titreFac2">Kin-Gombe/OLD-GATE </p> <p class="titreFac2">Tél +243 970494397 </p> ${{prodDD | json}} <img src="assets/images/logoPharma.jpeg" class="logo"> <div class="divHaut"> <div class="divHaut1"><p class="titreFac3">TRAV</p></div> <div class="divHaut2"><p class="titreFac3">FACTURE N°</p></div></div> <hr> <table border="2px"> <th>ID</th>  <th>NOM</th>  <th>PU</th>  <th>QTE</th>  <th>PT</th> <tr> <td>0015</td> <td>Paracetamole</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> <tr> <td>00000015</td> <td>Ubucap</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> </table> <hr>  <div class="divBas"> <div class="divBas1"> <p class="titreFac2">WWW.CTI.com </p> <p class="titreFac2"> DATE HEURE </p></div> <div class="divBas2"> <div class="divBas21"> <div class="divBas21A"> <p class="titreFac2">NET</p> </div> <div class="divBas21B"> <p class="titreFac2">15500</p> </div> </div> <div class="divBas22"> <div class="divBas21A"><p class="titreFac2">TVA</p></div> <div class="divBas21B"> <p class="titreFac2">0.05</p> </div> </div> </div> </div> </body>  </html>');

      printWindow?.document.close();

      printWindow?.focus();
      printWindow?.print();

      printWindow?.close();



      document.getElementById('pageServer')!.style.display="block";


    }

    repCorrecct:any=false;
    repETat:any=false;

    minorerProduit(){

      this.api.minorerProduit(this.idInitialiser,this.qteMinorer,this.stockVariable,this.stockFixe).subscribe(data=>{

        this.data=data.data;

        this.repCorrecct=this.data['correct'];

        this.repETat=this.data['etat'];

        if(this.repCorrecct==true){

          if(this.repETat==true){

            alert('Effectué !')

          }
          else{

            alert('eror!')

          }
        }

        else{

            alert('Impossible de minoriser à la HAUSSE');

            alert('Veuillez reduire la taille en tenant compte de quantite deja vendue et Quantite restante, NB: QTE VENDUES + QTE RESTANTE = STOCK FIXE')


        }


        })


    }

    typeOpAbonne:any="";

    tabInfoABnn:any=['Inscription','Prescription']


    changeOpAbonnement(){

      if(this.typeOpAbonne=='Prescription'){

      this.affichaPageGestionPrescription()

      }
      else{

        this.affichaPageGestionAbonnes()

      }

    }

    prefixPriseCharge:any='';

    tabInfoPrise:any=[];

    selectLikePriseCharge(){

      this.api.getLIkePriseChaege(this.prefixPriseCharge).subscribe(data=>{

        this.tabInfoPrise=data.data;

      })

    }

    listPrescLike:any=[];

    prefixPrescr:any="";

    rechercheDistincPresc(){

      this.api.getDistinctPrescr(this.prefixPrescr).subscribe(data=>{

        this.listPrescLike=data.data;


      })

    }

    nomPresc:any=""

    listPrescLikeTab:any=[]

    listPrescLikeTabSOLO:any={}

    mailPrescPrise:any="";

    adrPrescPrise:any="";
    telPrescPrise:any="";
    sexePrescPrise:any="";
    prenomPrescPrise:any="";
    nomPrescPrise:any="";

    affiPrescption(){

      this.mailPrescPrise=""
      this.adrPrescPrise=""
      this.telPrescPrise=""
      this.adrPrescPrise=""
      this.telPrescPrise=""
      this.sexePrescPrise=""
      this.prenomPrescPrise=""
      this.nomPrescPrise=""

      this.api.getPrescrPrise(this.nomPresc).subscribe(data=>{

        this.listPrescLikeTab=data.data

        this.listPrescLikeTabSOLO=data.data[0]

        this.mailPrescPrise=this.listPrescLikeTabSOLO.gmail;
        this.adrPrescPrise=this.listPrescLikeTabSOLO.adresse;
        this.telPrescPrise=this.listPrescLikeTabSOLO.tel;
        this.sexePrescPrise=this.listPrescLikeTabSOLO.sexe;
        this.prenomPrescPrise=this.listPrescLikeTabSOLO.prenom;
        this.nomPrescPrise=this.listPrescLikeTabSOLO.nom;


      })

    }

    nomPriseChRech:any=''
    listInfoPrise:any={};

    rechercheProduiRavPriseChage(){

      this.api.getPriseChargeAffiche(this.nomPriseChRech).subscribe(data=>{

        this.listInfoPrise=data.data[0];

        this.priseNom=this.listInfoPrise.nom;
        this.prisePrenom=this.listInfoPrise.prenom;
        this.priseSexe=this.listInfoPrise.sexe;
        this.priseTel=this.listInfoPrise.tel;

        this.priseAdr=this.listInfoPrise.adresse;
        this.priseGmail=this.listInfoPrise.gmail;

      })

    }


    priseNom:any="";
    prisePrenom:any="";
    priseSexe:any="";
    priseTel:any="";
    priseAdr:any="";
    priseGmail:any="";

    repPrise:any="";

    datapushPrise:any={}

    savePriseCharge(){

      if(this.priseNom=="" || this.prisePrenom=="" || this.priseSexe=="" || this.priseTel=="" || this.priseAdr=="" || this.priseGmail=="" ){

        alert('Remplissez tous les champs et ressayer plus tard !')
      }
      else{

        const dat={

          nom:this.priseNom,
          prenom:this.prisePrenom,
          sexe:this.priseSexe,
          tel:this.priseTel,
          adresse:this.priseAdr,
          trav:this.id,
          gmail:this.priseGmail
      }

        this.datapushPrise['data']=dat;

        this.datapushPrise['bd']=this.api.bd;

        this.api.createPriseCharge(this.datapushPrise).subscribe(data=>{

          this.repPrise=data.etat;

          if(this.repPrise==true){

            alert('Effectué !');

            this.priseNom=""
            this.prisePrenom=""
            this.priseSexe=""
            this.priseTel=""
            this.priseAdr=""
            this.priseGmail=""

          }
          else{

            alert('ERROR! veuillez bien respecter le format de données comme indiqué');

          }

        })

      }
    }

      repPriseZZ:any=[];

      updatePriseCharge(){

      if(this.priseNom=="" || this.prisePrenom=="" || this.priseSexe=="" || this.priseTel=="" || this.priseAdr=="" || this.priseGmail=="" ){

        alert('Remplissez tous les champs et ressayer plus tard !')
      }
      else{

        const dat={

          nom:this.priseNom,
          prenom:this.prisePrenom,
          sexe:this.priseSexe,
          tel:this.priseTel,
          adresse:this.priseAdr,
          trav:this.id,
          gmail:this.priseGmail
      }

        this.datapushPrise['data']=dat;

        this.datapushPrise['bd']=this.api.bd;

        this.api.updatePriseCharge(this.datapushPrise).subscribe(data=>{

          this.repPriseZZ=data;

          this.repPrise=data.etat;

          if(this.repPrise==true){

            alert('Effectué !');

            this.priseNom=""
            this.prisePrenom=""
            this.priseSexe=""
            this.priseTel=""
            this.priseAdr=""
            this.priseGmail=""

          }
          else{

            alert('ERROR! veuillez bien respecter le format de données comme indiqué');

          }

        })

      }
    }

    dataPermission:any=[];
    permissionVerifStock:any=false;

    getpermissionVerificateurStock(){

      this.api.getAutotorisationGen().subscribe(data=>{

        this.dataPermission=data.data;

        this.permissionVerifStock=this.dataPermission[0].etat;

      })

    }


    dataDexi:Friend[]=[];

    async saveBD(){



     // this.dexiAPI.addElement({ id:1,bd:"pharmaFM",phone:'FM12440'});

      this.dexiAPI.addUpdate(1,{ id:1,bd:"pharmaFM_NEW",pharmacie:'FM12440_NEW'});

      this.dataDexi= await this.dexiAPI.getElement();



    }

    bdFont:any="";
    matriell:any="Terminal";

    async testerServerFront(){

      this.dataDexi= await this.dexiAPI.getElement();

      this.bdFont=this.dataDexi[0].bd;

      this.matriell=this.dataDexi[0].matriel;

      this.nomPharma=this.dataDexi[0].pharmacie;

      this.testerServerAuto(this.bdFont);

      if(this.matriell=="Terminal"){

        document.documentElement.style.setProperty('--taillTicket','58mm')

      }
      else{

        document.documentElement.style.setProperty('--taillTicket','80mm')


      }


    }

    imprimerTicketTest(){

      const prodDD="junior";

      const contentPrint=""



      const printWindow=window.open('','_blank');


      if (printWindow){

        printWindow.document.open();

        printWindow.document.write('<!DOCTYPE html> <html> <head> <style> .titreFac1{font-size:12px;font-weight: bold;color:black;text-align:center} .titreFac2{font-size:11px;font-weight: bold;color:black; text-align:center} .logo{width: 30%;height: 50px;border-radius:50%;margin-left: 30%;box-shadow: 5px 5px 2px gray;}.divHaut{width:100%;height:30px;}.divHaut1{width:55%;height:100%;display:inline-block;}.divHaut2{width:38%;height:100%;display:inline-block;}.titreFac3{font-size:10px;font-weight: bold;color:black; text-align:left} .divBas{width:100%;height:80px;border:solid 2px black} .divBas1{width:40%;height:100%;border:solid 2px black;display:inline-block} .divBas2{width:50%;height:100%;border:solid 2px black;display:inline-block} .divBas21{width:100%;height:45%;border:solid 2px black} .divBas22{width:100%;height:45%;border:solid 2px black} .divBas21A{width:40%;height:100%;border:solid 2px black; display:inline-block}.divBas21B{width:45%;height:100%;border:solid 2px black; display:inline-block} th{background-color:gray;font-size:12px;font-weight:bold} td{font-size:11px;font-weight:bold} </style> </head> <body> <p class="titreFac1">NOM DE LA PHARMACIE</p>  <p class="titreFac2">RCCM K004/BN/5005 2024 </p> <p class="titreFac2">Kin-Gombe/OLD-GATE </p> <p class="titreFac2">Tél +243 970494397 </p> ${{prodDD | json}} <img src="assets/images/logoPharma.jpeg" class="logo"> <div class="divHaut"> <div class="divHaut1"><p class="titreFac3">TRAV</p></div> <div class="divHaut2"><p class="titreFac3">FACTURE N°</p></div></div> <hr> <table border="2px"> <th>ID</th>  <th>NOM</th>  <th>PU</th>  <th>QTE</th>  <th>PT</th> <tr> <td>0015</td> <td>Paracetamole</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> <tr> <td>00000015</td> <td>Ubucap</td> <td>2500</td> <td>3</td> <td>5000</td> </tr> </table> <hr>  <div class="divBas"> <div class="divBas1"> <p class="titreFac2">WWW.CTI.com </p> <p class="titreFac2"> DATE HEURE </p></div> <div class="divBas2"> <div class="divBas21"> <div class="divBas21A"> <p class="titreFac2">NET</p> </div> <div class="divBas21B"> <p class="titreFac2">15500</p> </div> </div> <div class="divBas22"> <div class="divBas21A"><p class="titreFac2">TVA</p></div> <div class="divBas21B"> <p class="titreFac2">0.05</p> </div> </div> </div> </div> </body>  </html>');

        printWindow.document.close();

        printWindow.onload=()=>{

          printWindow.focus();
          printWindow.print();

        }


      }



    }





    }





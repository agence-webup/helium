"use strict";class Helium{constructor(){this.dropmics=[],this.version="3.4.0"}init(){return this._datatable(),this._forms(),this._flash(),this._dropmic(),this._feather(),this._notif(),this._filter(),console.info("🎈 Helium "+this.version),this}_feather(){feather.replace()}_datatable(){$.extend(!0,$.fn.dataTable.defaults,{bStateSave:!0,pageLength:150,lengthChange:!1,language:{sProcessing:"Traitement en cours...",sSearch:"Rechercher&nbsp;:",sLengthMenu:"Afficher _MENU_ &eacute;l&eacute;ments",sInfo:"Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",sInfoEmpty:"Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",sInfoFiltered:"(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",sInfoPostFix:"",sLoadingRecords:"Chargement en cours...",sZeroRecords:"Aucun &eacute;l&eacute;ment &agrave; afficher",sEmptyTable:"Aucune donn&eacute;e disponible dans le tableau",oPaginate:{sFirst:"Premier",sPrevious:"Pr&eacute;c&eacute;dent",sNext:"Suivant",sLast:"Dernier"},oAria:{sSortAscending:": activer pour trier la colonne par ordre croissant",sSortDescending:": activer pour trier la colonne par ordre d&eacute;croissant"}}}),$(".dataTable tbody").on("click","tr[data-link]",(function(){window.location.href=$(this).data("link")}))}_forms(){[].forEach.call(document.querySelectorAll("[data-submit]"),(e=>{e.addEventListener("click",(t=>{if(t.preventDefault(),t.stopPropagation(),e.dataset.confirm&&!confirm(e.dataset.confirm))return;let a=document.getElementById(e.dataset.submit);a&&a.submit()}))}))}_flash(){[].forEach.call(document.querySelectorAll(".notif"),(function(e){e.addEventListener("click",(e=>{e.target.style.display="none"}))}))}_dropmic(){[].forEach.call(document.querySelectorAll("[data-dropmic]"),(e=>{this.dropmics.push(new Dropmic(e))}))}_notif(){[].forEach.call(document.querySelectorAll("[data-notif]"),(e=>{this.notif(e.dataset.notif,e.innerHTML).show(),e.style.display="none"}))}_filter(){const e="is-active";[].forEach.call(document.querySelectorAll("[data-helium-filter]"),(t=>{t.addEventListener("click",(()=>{var a;"all"===t.getAttribute("data-helium-filter")?([].forEach.call(document.querySelectorAll("[data-helium-filter-target]"),(e=>{e.style.display=null})),[].forEach.call(document.querySelectorAll("[data-helium-filter]"),(t=>{t.classList.remove(e)})),document.querySelector('[data-helium-filter="all"]').classList.add(e)):(a=t.getAttribute("data-helium-filter"),[].forEach.call(document.querySelectorAll("[data-helium-filter-target]"),(e=>{e.style.display="none"})),[].forEach.call(document.querySelectorAll("[data-helium-filter]"),(t=>{t.classList.remove(e)})),document.querySelector('[data-helium-filter-target="'+a+'"]').style.display=null,document.querySelector('[data-helium-filter="'+a+'"]').classList.add(e))}))}))}notif(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"success",t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.layout="topRight",a.theme="helium",a.type=e,a.text=t,a.timeout=5e3,new Noty(a)}}window.Helium=(new Helium).init();
class Helium {
    
    constructor() {
        this.dropmics = [];
        this.version = '3.0';
    }
    
    init() {
        this._datatable();
        this._forms();
        this._flash();
        this._dropmic();
        this._feather();
        this._notif();
        console.info('🎈 Helium ' + this.version);
        
        return this;
    }
    
    _feather() {
        feather.replace()
    }
    
    _datatable() {
        $.extend(true, $.fn.dataTable.defaults, {
            bStateSave: true,
            pageLength: 150,
            lengthChange: false,
            language: {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
                "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Pr&eacute;c&eacute;dent",
                    "sNext": "Suivant",
                    "sLast": "Dernier"
                },
                "oAria": {
                    "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                }
            }
        });
        
        $('.dataTable tbody').on('click', 'tr', function () {
            window.location.href = $(this).data('link');
        });
    }
    
    _forms() {
        
        // form helpers
        [].forEach.call(document.querySelectorAll('[data-submit]'), (el) => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation()
                
                // if no confirmation
                if (event.target.dataset.confirm && !confirm(event.target.dataset.confirm)) return;
                
                // let's submit the form
                let form = document.getElementById(event.target.dataset.submit);
                if (form) {
                    form.submit();
                }
            })
        });
    }
    
    _flash() {
        // flash helpers
        [].forEach.call(document.querySelectorAll('.notif'), function (el) {
            el.addEventListener('click', (event) => {
                event.target.style.display = "none";
            });
        });
    }
    
    _dropmic() {
        [].forEach.call(document.querySelectorAll('[data-dropmic]'), (el) => {
            this.dropmics.push(new Dropmic(el));
        });
    }
    
    _notif() {
        [].forEach.call(document.querySelectorAll('[data-notif]'), (el) => {
            this.notif(el.dataset.notif, el.innerHTML).show();
            el.style.display = 'none';
        });
    }
    
    notif(type = 'success', text, config = {}) {
        config.layout = 'topRight';
        config.theme = 'helium';
        config.type = type;
        config.text = text;
        config.timeout = 5000;
        return new Noty(config);
    }
}

window.Helium = new Helium().init();
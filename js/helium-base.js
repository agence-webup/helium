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

// datatable click
$('.dataTable tbody').on('click', 'tr', function () {
    window.location.href = $(this).data('link');
});

(function () {
    // init globar config object
    window.Helium = {};

    // form helpers
    [].forEach.call(document.querySelectorAll('[data-submit]'), function (el) {
        el.addEventListener('click', (e) => {
            // handle confirm
            if (e.target.dataset.confirm && !confirm(e.target.dataset.confirm)) {
                e.preventDefault();
            }
            
            let form = document.getElementById(e.target.dataset.submit);
            
            // submit form
            if (form) {
                form.submit();
            }
        })
    });
    
    // flash helpers
    [].forEach.call(document.querySelectorAll('.notif'), function (el) {
        el.addEventListener('click', (e) => {
            e.target.style.display = "none";
        });
    });
    
    // dropmic
    window.Helium.dropmics = [];
    [].forEach.call(document.querySelectorAll('[data-dropmic]'), function (el) {
        console.log(el);
        window.Helium.dropmics.push(new Dropmic(el));
    });
}());
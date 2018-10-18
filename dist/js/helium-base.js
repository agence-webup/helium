"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helium =
/*#__PURE__*/
function () {
  function Helium() {
    _classCallCheck(this, Helium);

    this.dropmics = [];
    this.version = '3.0';
  }

  _createClass(Helium, [{
    key: "init",
    value: function init() {
      this._datatable();

      this._forms();

      this._flash();

      this._dropmic();

      this._feather();

      console.info('🎈 Helium ' + this.version);
    }
  }, {
    key: "_feather",
    value: function _feather() {
      feather.replace();
    }
  }, {
    key: "_datatable",
    value: function _datatable() {
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
  }, {
    key: "_forms",
    value: function _forms() {
      // form helpers
      [].forEach.call(document.querySelectorAll('[data-submit]'), function (el) {
        el.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation(); // if no confirmation

          if (event.target.dataset.confirm && !confirm(event.target.dataset.confirm)) return; // let's submit the form

          var form = document.getElementById(event.target.dataset.submit);

          if (form) {
            form.submit();
          }
        });
      });
    }
  }, {
    key: "_flash",
    value: function _flash() {
      // flash helpers
      [].forEach.call(document.querySelectorAll('.notif'), function (el) {
        el.addEventListener('click', function (event) {
          event.target.style.display = "none";
        });
      });
    }
  }, {
    key: "_dropmic",
    value: function _dropmic() {
      [].forEach.call(document.querySelectorAll('[data-dropmic]'), function (el) {
        this.dropmics.push(new Dropmic(el));
      });
    }
  }]);

  return Helium;
}();

window.Helium = new Helium().init();
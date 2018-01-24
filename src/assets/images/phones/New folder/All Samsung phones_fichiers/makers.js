$gsm.onload(function () {
    var MAX_PHONES_SELECTED = location.host.match(/^m\./)? 2 : 3;
    var COMPARE_URL = "//www.gsmarena.com/compare.php3?";

    var makers = document.querySelector(".makers");
    var phones = makers.querySelectorAll("li");
    var selectedPhones = [];

    var compareButton = document.querySelector(".compare-button");
    compareButton.onclick = function (event) {
        if (selectedPhones.length == 0) {
            $gsm.toggleClass(makers, "compare-mode");
        } else {
            var ids = [];
            for (var i = 0; i < selectedPhones.length; i++) {
                var id = (selectedPhones[i].querySelector("a").href.match(/-(\d+)\.php/) || [0, 0])[1];
                ids.unshift("idPhone" + (i + 1) + "=" + id);
            };
            window.location = COMPARE_URL + ids.join("&");
        }

        event.preventDefault();
    }

    for (var i = 0; i < phones.length; i++) {
        phones[i].addEventListener("click", function (event) {
            if (!$gsm.hasClass(makers, "compare-mode")) return;

            var hitboxSize = 84;
            if (event.offsetY > hitboxSize || event.offsetX < this.offsetWidth - hitboxSize) return;
            
            if ($gsm.hasClass(this, "checked")) {
                $gsm.removeClass(this, "checked");
                var index = selectedPhones.indexOf(this);
                selectedPhones.splice(index, 1);
            } else {
                $gsm.addClass(this, "checked");

                selectedPhones.unshift(this);
                var phonesToDeselect = selectedPhones.splice(MAX_PHONES_SELECTED);

                for (var j = 0; j < phonesToDeselect.length; j++) {
                    $gsm.removeClass(phonesToDeselect[j], "checked");
                }
            }

            event.preventDefault();
        });
    }
});
import $ from "jquery";

$(document).ready(function() {

    function sort(box_selector, item_selector, dataset_index, asc = false) {
        $(document).ready(function() {
            var $wrapper = $(box_selector);

            $wrapper.find(item_selector).sort(function(a, b) {
                // ASC: Ordernar do menor para o maior.
                if (asc) {
                    return parseFloat(a.dataset[dataset_index]) - parseFloat(b.dataset[dataset_index]);
                
                // DESC: Ordernar do maior para o menor.
                } else {
                    return parseFloat(b.dataset[dataset_index]) - parseFloat(a.dataset[dataset_index]);
                }
            }).appendTo($wrapper);
        });
    }

    sort('.wallets-box', '.wallet-item', 'trust', false);
});
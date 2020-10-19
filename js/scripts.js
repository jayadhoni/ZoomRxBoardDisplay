var DataBinding = (function($) {

    var sampleDataList;
    var sampleDataListLength;
    var counter = 0;
    var loadData = function() {
        sampleDataList = [{
            listName: 'List 1',
            cardsList: [{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text 3",
                    commentDate: new Date("2015/08/10")
                },{
                    commentText: "comment text 2",
                    commentDate: new Date("2015/08/07")
                },{
                    commentText: "comment text 1",
                    commentDate: new Date("2015/08/05")
                }]
            },{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text",
                    commentDate: new Date("1991/08/23")
                }]
            },{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text",
                    commentDate: new Date("1991/08/23")
                }]
            }]
        },{
            listName: 'List 2',
            cardsList: [{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text",
                    commentDate: new Date("1991/08/23")
                }]
            },{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text",
                    commentDate: new Date("1991/08/23")
                }]
            }]
        },{
            listName: 'List 3',
            cardsList: [{
                cardTitle: "Card title",
                cardDescription: "Card Description",
                cardComments: [{
                    commentText: "comment text",
                    commentDate: new Date("1991/08/23")
                }]
            }]
        }];
        sampleDataListLength = sampleDataList.length;

    }

    var createElements = function() {
        for (i=0;i<sampleDataListLength;i++) {
            boardFunction(sampleDataList[i]);
            for (j=0;j<sampleDataList[i].cardsList.length;j++) {
                var cardContainer = ".board-list>.row>.col-md-3:nth-child(" + (i + 1) + ")";
                var addCard = $(cardContainer + " .card-container p");
                cardFunction(addCard);
                for (k=0;k<sampleDataList[i].cardsList[j].cardComments.length;k++) {
                    var commentContainer = $(cardContainer + " div .card-item:nth-child(" + (j + 1) + ")" + " button.comment");
                    commentFunction(commentContainer, sampleDataList[i].cardsList[j].cardComments[k]);
                }
            }
        }
    }

    var boardFunction = function(data) {
        counter++;
        var content = data ? data.listName : "List " +  counter;
        $(".board-list .row .new-board-list-item").before(
            "<div class=\"col-md-3 col-sm-4 board-list-items\"><div class=\"board-list-item\"><div class=\"row\"><div class=\"col-md-6\"><h3>" + 
            content +
            "</h3></div><div class=\"col-md-6\"><button class=\"deleteList\">Delete this list</button></div></div><div class=\"card-container\"><p>Add new card...</p></div></div></div>"
        );
    }
    
    var cardFunction = function(element) {
        $(element).parent().before("<div><div class=\"card-item\"><div class=\"row\"><div class=\"col-md-6\"><h5>Card title</h5></div><div class=\"col-md-6\"><button class=\"deleteCard\">Delete card</button></div></div><textarea row=\"2\"></textarea><textarea row=\"3\" class=\"comment\"></textarea><button class=\"comment\">Add Comment</button></div></div>");
    }
    
    var commentFunction = function (element, data) {
        var comment = $($(element).siblings('.comment')).val();
        var date = new Date();
        if (data) {
            comment = data.commentText;
            date = data.commentDate;
        }
        $(element).after("<div class=\"row\"><div class=\"col-md-6 col-sm-6\"><span>" + comment + "</span></div><div class=\"col-md-6 col-sm-6\"><span>" + $.datepicker.formatDate('dd M yy', date) + "</span></div></div>");
    }

    var deleteFunction = function (element) {
        $(element).closest(".board-list-item").parent().remove();
    }

    var deleteCardFunction = function (element) {
        $(element).closest(".card-item").remove();
    }
    
    var eventBinding = function() {
        $(document).on("click", ".card-container p" , function($event) {
            $event.stopPropagation();
            cardFunction($event.target);
        });
        $(document).on("click", ".card-item button" , function($event) {
            $event.stopPropagation();
            commentFunction($event.target);
        });
        $(document).on("click", "button.deleteList" , function($event) {
            $event.stopPropagation();
            deleteFunction($event.target);
        });
        $(document).on("click", "button.deleteCard" , function($event) {
            $event.stopPropagation();
            deleteCardFunction($event.target);
        });
        $(document).on("click", ".new-board-list-item .col-md-3" , function($event) {
            $event.stopPropagation();
            boardFunction();
        });
    }

    var init = function () {
        loadData();
        createElements();
        eventBinding();
    };

    return {
        init: init
    };
})(jQuery);

DataBinding.init();


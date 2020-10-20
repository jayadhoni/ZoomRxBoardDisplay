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
            boardFunction(sampleDataList[i], i);
            for (j=0;j<sampleDataList[i].cardsList.length;j++) {
                var cardContainer = ".board-list>.row>.col-md-3:nth-child(" + (i + 1) + ")";
                var addCard = $(cardContainer + " .card-container p");
                cardFunction(addCard, i, j);
                for (k=0;k<sampleDataList[i].cardsList[j].cardComments.length;k++) {
                    var commentContainer = $(cardContainer + " div .card-item:nth-child(" + (j + 1) + ")" + " button.comment");
                    commentFunction(commentContainer, sampleDataList[i].cardsList[j].cardComments[k]);
                }
            }
        }
    }

    var boardFunction = function(data, i) {
        counter++;
        var content = data ? data.listName : "List " +  counter;
        $(".board-list .row .new-board-list-item").before(
            "<div class=\"col-md-3 col-sm-4 board-list-items\" draggable=\"true\"><div class=\"board-list-item\"><div class=\"row\"><div class=\"col-md-6\"><h3>" + 
            content +
            "</h3></div><div class=\"col-md-6\"><button class=\"deleteList\">Delete this list</button></div></div><div class=\"card-container\"><p>Add new card...</p></div></div></div>"
        );
        bindDragEvent(i);
    }
    
    var cardFunction = function(element, i, j) {
        $(element).parent().before("<div class=\"card-items\"><div class=\"card-item\"><div class=\"row\"><div class=\"col-md-6\"><h5>Card title</h5></div><div class=\"col-md-6\"><button class=\"deleteCard\">Delete card</button></div></div><textarea row=\"2\"></textarea><textarea row=\"3\" class=\"comment\"></textarea><button class=\"comment\">Add Comment</button></div></div>");
        if (i !== undefined && j !==undefined){
            bindCardDragEvent(i, j);
        } else {
            bindCardDragEvent('', $(element).parent().parent().find(".card-items").length - 1, element.closest('.board-list-items'));
        }
        
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
            counter--;
            deleteFunction($event.target);
        });
        $(document).on("click", "button.deleteCard" , function($event) {
            $event.stopPropagation();
            deleteCardFunction($event.target);
        });
        $(document).on("click", ".new-board-list-item .col-md-3" , function($event) {
            $event.stopPropagation();
            boardFunction('', counter);
        });
        
    }

    var bindDragEvent = function(data) {
        $( ".board-list-items:nth-child(" + (data + 1) + ")" ).draggable({
            start: function($event) {
                console.log($event);
            },
            drag: function($event) {
                console.log($event);
            },
            stop: function($event) {
                console.log($event);
            }
        });
    }

    var bindCardDragEvent = function(i,j, listelement) {
        var selector;
        var cardelement = " .card-items:nth-child(" + (j + 2) + ")";
        if (listelement) {
            selector = $($(listelement).find(cardelement)[0]);
        } else {
            listelement = ".board-list-items:nth-child(" + (i + 1) + ")";
            selector = $(listelement + cardelement)
        }
        selector.draggable({
            containment: listelement ,
            start: function($event) {
                console.log($event);
            },
            drag: function($event) {
                console.log($event);
            },
            stop: function($event) {
                console.log($event);
            }
        })
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


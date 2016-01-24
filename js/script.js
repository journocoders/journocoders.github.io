(function(){

    var sectionList = document.querySelectorAll('.group-list a');
    var groupSections = document.querySelectorAll('.group-section');

    window.onload = function(){
        changeSection(window.location.hash.replace('#',''));
        window.onhashchange = function(){
            changeSection(window.location.hash.replace('#',''));
        }
    }

    function changeSection(hash){
        if (!hash) {
            hash = 'london';
        }
        var section = document.querySelector('#'+hash);
        if (section) {
            for (var i = 0; i < groupSections.length; i++) {
                groupSections[i].style.display = 'none';
            }
            for (var i = 0; i < sectionList.length; i++) {
                sectionList[i].className = sectionList[i].className.replace('active','');
            }
            section.style.display = 'block';
            document.querySelector('.group-list a[href="#'+hash+'"]').className += 'active';
        } else {
            changeSection();
        }
    }

}());

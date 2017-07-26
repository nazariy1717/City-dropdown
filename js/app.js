var dropDown = {


    cityArray: LIST,
    cityList: document.querySelector('.list'),
    dropList: document.querySelector('.dropdown__list'),
    label: document.querySelector('.dropdown__label'),
    lies: document.getElementsByClassName('list__item'),

    removePopulation: function () {

        // function toFilter(value){
        //     return value.population < 1000000;
        // }
        //
        // dropDown.cityArray.filter(toFilter);

        for (var key in this.cityArray) {
            if (this.cityArray[key].population < 1000000) {
                this.cityArray.splice(key, 1);
            }
        }

        // console.log(dropDown.cityArray);
        return this.cityArray;

    },

    writeList: function (array, clear) {
        console.log(array);
        if (clear) {
            this.cityList.innerHTML = '';
        }
        if (array.length) {
            for (var key in array) {
                var value =
                    '<li class="list__item" onclick="dropDown.setCity(this)" data-city="' + array[key].city + '">'
                    + array[key].city + ' населлення '
                    + (parseInt(array[key].population) / 1000000).toFixed(1) + ' млн' + '</li>';

                this.cityList.insertAdjacentHTML('beforeend', value);
            }
        } else {
            this.cityList.insertAdjacentHTML('beforeend', '<li class="list__item">Not Found</li>');

        }

    },

    sortCity: function (cityValue) {
        cityValue = cityValue.toLowerCase();
        if (cityValue == '') {
            this.writeList(dropDown.cityArray, true);
            return false;
        }
        var arr = [], find;
        for (var i in this.cityArray) {
            find = this.cityArray[i].city.toLowerCase();
            if (find.search(cityValue) != '-1') {
                arr.push(this.cityArray[i]);
            }
        }
        arr.sort(function (a, b) {
            console.log(a, b);
            a = a.city.substring(0, cityValue.length).toLowerCase();
            b = b.city.substring(0, cityValue.length).toLowerCase();
            if ((a == cityValue && b != cityValue)) {
                return -1;
            } else if (b == cityValue && a != cityValue) {
                return 1;
            }
            return 0;
        });

        this.writeList(arr, true);
    },

    setCity: function (element) {
        console.log(dropDown.lies);

        var active = document.querySelector('.list .active');

        if(active){
            active.classList.remove('active');
        }


        element.classList.add('active');
        var index = element.getAttribute('data-city');
        console.log(index);
        this.label.innerHTML = index;
    },


    init: function () {
        this.removePopulation();
        this.writeList(dropDown.cityArray, false);
        this.events();
    },


    events: function (element) {

        dropDown.label.onclick = function () {
            dropDown.dropList.classList.toggle('is-visible');
        };


        document.querySelector('.dropdown__input').onkeyup = function () {
            dropDown.sortCity(this.value);
        };




    }

};

dropDown.init();
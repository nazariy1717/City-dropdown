var dropDown = {

    cityArray: LIST,
    cityList: document.querySelector('.list'),
    dropDown_b: document.querySelector('.dropdown'),
    dropList: document.querySelector('.dropdown__list'),
    label: document.querySelector('.dropdown__label'),
    lies: document.getElementsByClassName('list__item'),

    removePopulation: function () {

        for (var key in this.cityArray) {
            if (this.cityArray[key].population < 1000000) {
                this.cityArray.splice(key, 1);
            }
        }
        return this.cityArray;
    },

    writeList: function (array, clear) {
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

        var active = document.querySelector('.list .active');

        if(active){
            active.classList.remove('active');
        }

        element.classList.add('active');
        var index = element.getAttribute('data-city');
        this.label.innerHTML = index;
    },

    init: function () {
        this.removePopulation();
        this.writeList(dropDown.cityArray, false);
        this.events();
    },

    events: function (element) {

        dropDown.label.onclick = function () {
            dropDown.dropDown_b.classList.toggle('is-visible');
            document.querySelector('.dropdown__input').value = '';
            dropDown.writeList(dropDown.cityArray, true);
        };

        document.querySelector('.dropdown__input').onkeyup = function () {
            dropDown.sortCity(this.value);
        };

    }

};

dropDown.init();
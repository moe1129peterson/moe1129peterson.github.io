let path = location.href;

console.log(path);

let resultsArray = path.split('/');

console.log(resultsArray);

let numberOfParts = resultsArray.length;

console.log(numberOfParts - 1);


let pageName = `/${resultsArray[3]}`;

console.log('This is the pagename >>>>>>>>> ' + pageName);





let navItems = document.querySelectorAll("ul#primaryNav li a");
console.log(`This is the navItems >>>>>>>>> ${navItems}`);


let i;

for (i = 0; i < navItems.length; i++) {

    let myPage = navItems[i].getAttribute("href");
    console.log('This is myPage ' + myPage);

    if (pageName === myPage) {
        console.log('This is myPage parentNode' + navItems[i].parentNode);
        navItems[i].parentNode.className = "active";
        console.log('This is the grandparent' + navItems[i].parentNode.parentNode.parentNode);
        navItems[i].parentNode.parentNode.parentNode.className = "parent";
        
    } else {
        navItems[i].parentNode.className = "";
    }
} //end of loop


const hb = document.querySelector('#hamburgerBtn');

hb.addEventListener('click', () => {
    document.querySelector('#primaryNav').classList.toggle('open');
    document.querySelector('.search').classList.toggle('hidden');
})
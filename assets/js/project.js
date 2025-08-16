

const projects = [
    {
        title: "Waiz - Digital Wallet and Remittance App and Website with Admin Panel",
        image: "assets/img/portfolio/waiz.png",
        category: "filter-web",
        link: "https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/53238316",
        galleryTitle: "Waiz - Global Money Transfer Solution"
    },
    {
        title: "Pay Secure - A Complete Digital Wallet Solution",
        image: "assets/img/portfolio/pay-secure.png",
        category: "filter-web",
        link: "https://codecanyon.net/item/pay-secure-a-complete-payment-processor-solution/41406578",
        galleryTitle: "Pay Secure - A Complete Digital Wallet Solution"
    },
    {
        title: "Merchant Panel Add-on For Pay Secure Wallet",
        image: "assets/img/portfolio/pay-secure-merchant-addon.png",
        category: "filter-web",
        link: "https://codecanyon.net/item/merchant-panel-addon-for-pay-secure/58740637",
        galleryTitle: "Merchant Panel Add-on For Pay Secure Wallet"
    },
    {
        title: "Agent Panel Add-on For Pay Secure Wallet",
        image: "assets/img/portfolio/pay-secure-agent-addon.png",
        category: "filter-web",
        link: "https://codecanyon.net/item/agent-panel-addon-for-pay-secure/58740639",
        galleryTitle: "Agent Panel Add-on For Pay Secure Wallet"
    },
    {
        title: "Pay Secure - Digital Wallet Application For Agent (Android, iOS)",
        image: "assets/img/portfolio/pay-secure-agent-app.png",
        category: "filter-app",
        link: "https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829",
        galleryTitle: "Pay Secure - Digital Wallet Application For Agent (Android, iOS)"
    },
    {
        title: "Pay Secure - Digital Wallet Application For Merchant (Android, iOS)",
        image: "assets/img/portfolio/pay-secure-merchant-app.png",
        category: "filter-app",
        link: "https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831",
        galleryTitle: "Merchant Panel Application For Pay Secure Wallet"
    },

    {
        title: "Software Farm BD",
        image: "assets/img/portfolio/softwarefarm.PNG",
        category: "filter-others",
        link: "https://softwarefarmbd.com",
        galleryTitle: "Software Farm"
    },
    {
        title: "Knowledge IT Institute",
        image: "assets/img/portfolio/kit.PNG",
        category: "filter-others",
        link: "https://kit.edu.bd/",
        galleryTitle: "KIT Website"
    },
    {
        title: "KIT Soft BD",
        image: "assets/img/portfolio/kitsoft.PNG",
        category: "filter-others",
        link: "https://kitsoftbd.com/",
        galleryTitle: "KIT Soft"
    }
];

const portfolioContainer = document.getElementById('portfolio-items');

projects.forEach(project => {
    const itemHTML = `
      <div class="col-lg-6 col-md-6 portfolio-item  ${project.category}">
        <div class="portfolio-wrap">
          <img src="${project.image}" class="img-fluid" alt="${project.title}">
          <div class="portfolio-links">
            <a href="${project.image}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${project.galleryTitle}">
              <i class="bx bx-plus"></i>
            </a>
            <a href="${project.link}" target="_blank" title="More Details">
              <i class="bx bx-link"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    portfolioContainer.insertAdjacentHTML('beforeend', itemHTML);
});
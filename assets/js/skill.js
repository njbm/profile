

const skills = [
  { name: "HTML", value: 100 },
  { name: "CSS", value: 90 },
  { name: "JavaScript", value: 75 },
  { name: "Vue JS", value: 55 },
  { name: "PHP", value: 80 },
  { name: "Laravel", value: 90 },
  { name: "WordPress/CMS", value: 80 },
  { name: "Elementor", value: 85 }
];

const skillsList = document.getElementById('skills-list');

skills.forEach((skill, index) => {
  const delay = index < Math.ceil(skills.length / 2) ? 0 : 100; // stagger animation
  const skillHTML = `
      <div class="col-lg-6" data-aos="fade-up" ${delay ? `data-aos-delay="${delay}"` : ''}>
        <div class="progress">
          <span class="skill">${skill.name} <i class="val">${skill.value}%</i></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" 
                 aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"
                 style="width:${skill.value}%;"></div>
          </div>
        </div>
      </div>
    `;
  skillsList.insertAdjacentHTML('beforeend', skillHTML);
});
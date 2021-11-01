export const jobTemplate = (title, author_name) => `
<div class="card">
  <div class="card-body">
  <h4 class="card-title">${title.title}:${author_name}${job.salary_max}</h4>
  <h5>${job.location.display_name}</h5>
  <p class="card-text">${job.description}</p>
  <a href="${job.redirect_url}">View Job</a>
  </div>
</div>
`;
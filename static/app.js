
/* globals $ */

async function load() {
  const lockState = await $.get('/getLockState');
  [1,2,3].forEach(i => {
    if(lockState[i].includes('un'))
      $(`#${i}`).find('i').removeClass('fa-lock').addClass('fa-unlock');
    else
      $(`#${i}`).find('i').removeClass('fa-unlock').addClass('fa-lock');
  });
}

$(() => {
  $('.button').click(async ({ currentTarget }) => {
    const { id } = currentTarget;
    $(currentTarget).find('i').toggleClass('fa-lock').toggleClass('fa-unlock');
    if($(currentTarget).find('i').hasClass('fa-lock'))
      $.get(`/lock/${id}`);
    else
      $.get(`/unlock/${id}`);
  });
  load();

  setInterval(load, 1000);
});

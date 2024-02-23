

window.addEventListener('DOMContentLoaded', () => {
          const jobs = document.querySelectorAll(".job");
          const classesToRemove = ['slide-left', 'slide-right'];

          setTimeout(() => {
                    jobs.forEach(job => job.classList.remove(...classesToRemove))
          }, 1000);
});
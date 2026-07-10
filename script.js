const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#primary-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#primary-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll("#primary-nav a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`[포트폴리오 문의] ${data.get("name")}`);
  const body = encodeURIComponent(`보낸 사람: ${data.get("name")}\n이메일: ${data.get("email")}\n\n${data.get("message")}`);
  window.location.href = `mailto:ghd315988@naver.com?subject=${subject}&body=${body}`;
});
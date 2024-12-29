$(document).ready(function () {
  // Skills data structure
  const skills = {
    programming: [
      { name: "C#", icon: "/assets/csharp_logo.png" },
      { name: "JavaScript", icon: "/assets/js_logo.png" },
      { name: "TypeScript", icon: "/assets/typescript_logo.png" },
      { name: "HTML5", icon: "/assets/html_logo.png" },
      { name: "CSS3", icon: "/assets/css_logo.png" },
      { name: "Dart", icon: "/assets/dart_logo.png" },
      { name: "Azure", icon: "/assets/azure_logo.png" },
    ],
    frameworks: [
      { name: ".NET Core", icon: "/assets/dotnet_logo.png" },
      { name: "Flutter", icon: "/assets/flutter_logo.png" },
      { name: "Next.js", icon: "/assets/nextjs_logo.png" },
      { name: "React.js", icon: "/assets/react_logo.png" },
      { name: "Angular", icon: "/assets/angular_logo.png" },
      { name: "Bootstrap", icon: "/assets/bootstrap_logo.png" },
      { name: "Tailwind", icon: "/assets/tailwind_logo.svg" },
    ],
    databases: [
      { name: "SQL Server", icon: "/assets/sql_logo.png" },
      { name: "MySQL", icon: "/assets/mysql_logo.png" },
    ],
  };

  // Function to create skill items
  function createSkillItem(skill) {
    return $("<div>", { class: "skill-item" }).append(
      $("<div>", { class: "skill-icon" }).append(
        $("<img>", { src: skill.icon, alt: skill.name })
      ),
      $("<span>", { class: "skill-name", text: skill.name })
    );
  }

  // Function to create skill category
  function createSkillCategory(title, skillsList) {
    const category = $("<div>", { class: "skills-category" }).append(
      $("<h2>", { text: title.toUpperCase() })
    );

    const grid = $("<div>", { class: "skills-grid" });

    skillsList.forEach((skill) => {
      grid.append(createSkillItem(skill));
    });

    category.append(grid);
    return category;
  }

  // Add each category
  $("#skills .container").append(
    createSkillCategory("PROGRAMMING LANGUAGES AND TOOLS", skills.programming),
    createSkillCategory("FRAMEWORKS", skills.frameworks),
    createSkillCategory("DATABASES", skills.databases)
  );

  // Smooth scrolling for navigation links
  $("nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 60,
        },
        800
      );
    }
  });

  // Add active class to navigation items on scroll
  $(window)
    .scroll(function () {
      const scrollDistance = $(window).scrollTop();

      $("section").each(function (i) {
        if ($(this).position().top <= scrollDistance + 100) {
          $("nav ul li a.active").removeClass("active");
          $("nav ul li a").eq(i).addClass("active");
        }
      });
    })
    .scroll();

  // Mobile menu toggle
  $(".menu-toggle").on("click", function () {
    $(".nav-menu").toggleClass("active");
  });

  // Close mobile menu when a link is clicked
  $(".nav-menu a").on("click", function () {
    $(".nav-menu").removeClass("active");
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (event) {
    if (!$(event.target).closest("nav").length) {
      $(".nav-menu").removeClass("active");
    }
  });
});

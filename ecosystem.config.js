


let cârtel = [
  {
    name: "Moderation",
    namespace: "RAVGAR",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Moderation"
  },
  {
    name: "Management",
    namespace: "RAVGAR",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Management"
  },
  {
    name: "Statistics",
    namespace: "RAVGAR",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Statistics"
  },
 {
    name: "Guard 1",
    namespace: "RAVGAR",
    script: 'Guard.Client.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_1"
  },
  {
    name: "Guard 2",
    namespace: "RAVGAR",
    script: 'Guard.Client.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_2"
  },
  {
    name: "Guard 3",
    namespace: "RAVGAR",
    script: 'Guard.Client.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_3"
  },
  {
    name: "Guard 4",
    namespace: "RAVGAR",
    script: 'Guard.Client.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_4"
  },
  {
    name: "Guard 5",
    namespace: "RAVGAR",
    script: 'Guard.Client.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_5"
  },
  {
    name: "FIREWALL_DİSTRİBUTORS",
    namespace: "RAVGAR",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/FIREWALL_DİSTRİBUTORS"
  },

]

module.exports = {
  apps: cârtel
};

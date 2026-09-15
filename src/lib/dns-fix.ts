import dns from "dns";

// On some Windows/VPN setups, Node's built-in resolver picks up a local
// stub (127.0.0.1) that refuses the raw DNS queries the `mongodb+srv://`
// scheme needs for its SRV/TXT lookups, even though the OS resolver works
// fine. Pointing Node at a public resolver avoids that mismatch.
// Must be imported before `mongoose`/`mongodb` so their SRV poller picks up
// the fixed server list — import this module first wherever mongoose loads.
dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);

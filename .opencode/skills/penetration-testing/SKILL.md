---
name: penetration-testing
description: Penetration testing methodology covering reconnaissance, scanning, exploitation, privilege escalation, persistence, reporting, tools, and responsible disclosure
license: MIT
compatibility: opencode
---

## penetration-testing

### Methodology (PTES)
1. **Pre-engagement** — Scope, rules of engagement, authorization
2. **Reconnaissance** — OSINT, subdomain enumeration, technology fingerprinting
3. **Scanning** — Port scanning, service identification, vulnerability scanning
4. **Exploitation** — Gaining initial access via known vulnerabilities
5. **Post-exploitation** — Privilege escalation, lateral movement, data exfiltration
6. **Persistence** — Backdoors, scheduled tasks, SSH keys
7. **Reporting** — Executive summary, findings, remediation

### Reconnaissance
| Tool | Purpose |
|---|---|
| `whois`, `dnsrecon` | Domain/IP intelligence |
| `theHarvester`, `Amass` | Subdomain enumeration |
| `Shodan`, `Censys` | Open port/device discovery |
| `Wayback Machine`, `Katana` | URL/path discovery |

### Scanning
- `nmap -sV -sC` — Service version + default scripts
- `masscan` — Fast large-scale port scanning
- Nuclei — Template-based vulnerability scanner
- Burp Suite / OWASP ZAP — Web app scanning

### Exploitation
- **Metasploit** — Framework for payload delivery
- **Burp Repeater/Intruder** — Manual web exploitation
- **SQLMap** — Automated SQL injection
- **Hydra / John / Hashcat** — Credential brute forcing

### Privilege Escalation
- **Linux**: SUID binaries, kernel exploits, `sudo -l`, cron jobs
- **Windows**: `SeImpersonatePrivilege`, unquoted service paths, AlwaysInstallElevated

### Persistence
- Web shells, reverse SSH tunnels
- Scheduled tasks / cron jobs
- Registry run keys (Windows)

### Reporting
- Executive summary (business impact)
- Technical findings with CVSS scores
- Step-by-step reproduction
- Remediation recommendations

### Responsible Disclosure
- Notify vendor privately, allow 90-day fix window
- Publish only after patch release
- Coordinate with CERT/CC or bug bounty platform

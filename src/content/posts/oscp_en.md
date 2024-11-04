---
title: My OSCP Experience
description: OSCP Exam Experience - Detailed Review, Tips & Journey to Passing the Offensive Security Certified Professional Certification | Personal Insights from the PWK Labs and 24-Hour Penetration Testing Challenge"
snippetone: Experiences
category: Experiences
SEOTitle: OSCP Experience
lang: en
date: 2023-07-01
---

**Warning:** This post is about my personal experiences and doesn’t cover technical details.

First of all, I want to make it clear that I’m writing this post without the intention of being a role model on how to approach the OSCP exam. I’m aware that there are thousands of posts on this topic, and I’m sure this won’t be the best one, nor does it aim to be. I simply wanted to share my story so that, in a few years, I can look back and see how I’ve evolved. Now that we’ve cleared that up… let’s get started! :D

### Introduction and Background

Before diving into how I approached the exam and lab, I think it’s best to set the stage by explaining my situation when I decided to pursue this certification.

I've always been a curious person (I think anyone in this field has to be). At the time, my background included:

* Some Linux knowledge gained through studies and self-learning.
* An understanding of the internal workings of websites, as I had worked as a web developer.
* Experience reviewing code in various languages to ensure there were no vulnerabilities.
* Completing a few Hack The Box machines (around 15).
* A general curiosity that led me to tinker with a bit of everything… :D

I was aware that my background might not have been the strongest—something I’m even more certain of now. But I needed a challenge like this in my life. I had proven my ability to review other people’s code and find vulnerabilities. Plus, I was about to start a new job as a pentester. What better time to start a new pentesting job than to also take on the OSCP certification challenge? (Cue the irony.)

### First Steps and the End of the Lab

Once I decided to take the exam, I read a lot of blogs that suggested different ways to approach the lab and exam. Some suggested practicing on platforms like Hack The Box or Try Hack Me first (the latter is better for beginners), while others recommended starting with the manual and lab before doing independent practice. I even read about people who would sleep for only 20 minutes every three hours for three months to stay awake and keep studying… :S

After gathering enough information, I decided to sign up for the OSCP, do the lab, and try to complete as many machines as possible within the three months leading up to the exam (spoiler: I was wrong). My reasoning was, “If I don’t study the manual first, I won’t be able to practice.” Once I began my plan, things moved quickly. I signed up for the three months, received the manual, tested the VPN, read along while doing exercises, and noticed time slipping by. I hadn’t started the lab yet, and time was still ticking away… After three weeks, I realized that the five exam points for the exercises weren’t worth the time I was investing, so I focused more on the lab. In short, and sparing you the lengthy explanation, I managed to complete around 35 lab machines (if I recall correctly).

### Post-Lab Phase

This is my first post, and I’m sure I’m rambling, so here’s a summary:

1. I decided to prioritize the lab first, then practice on HTB and THM.
2. I realized that doing the exercises wasn’t worth it.
3. In three months of lab time, I completed 35 machines.

At this point, I realized that I had made a mistake. I didn’t have enough experience, and I had entered the lab hoping the manual would teach me every technique I needed. I hadn’t yet understood the underlying philosophy they were trying to instill. During the three months I had to schedule the exam, summer arrived, and we were in the middle of the COVID lockdown. With the knowledge I had gained, I started practicing on HTB and THM, not very rigorously, but I managed to complete about two easy machines per week. My motivation was like a roller coaster—either I was obsessively working until the early hours, or I dreaded even attempting a machine.

After three post-lab months, I had completed around 20-30 machines on HTB and THM. I felt better prepared and wished I’d had this knowledge before starting the lab. I would’ve been able to get so much more out of it! Still, I didn’t feel fully prepared and was running out of time. I decided to buy 30 more days of lab access, giving me an additional three months to prepare. This time, I tackled the lab machines with a much better approach, and by the end, I had completed 45 lab machines.

### Final Stretch Before the Exam

After finishing the lab for the second time, I knew that if I didn’t set a date, I wouldn’t push myself the way people do when time is running out. So I booked the last Friday available, scheduling the exam for 10 a.m.—a time that allowed me to get a good night’s sleep and still have flexibility to rest during the exam if needed.

Between finishing the lab the second time and taking the exam, my progress was exponential. I started off slow, but each day I studied more and more, working on lab machines and following the OSCP’s “try harder” philosophy that everyone talks about once they pass. By the end, I had completed almost all the machines recommended on [this list](https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=1839402159).

Let me reiterate: I’m not trying to be anyone’s role model, and I know there are better ways to approach the exam without doing so many machines… but it worked for me.

### Exam Day

The day before the exam, I didn’t touch my laptop since I knew I’d be spending the entire next day on it. I went to bed early (around 10 or 11 p.m.). On exam day, I got up around 8:30, had breakfast, took a shower, and was at my computer by 9:30, feeling nervous since I didn’t know what to expect from the initial process. By 9:45, I was logged in, and someone with a nickname asked me to turn on my camera, show my two screens, and pan around the room to confirm no one else was present… :S. This process took no more than 10 minutes. After verifying all my documentation and surroundings, they said everything was in order, I received an email, and at 10:00 a.m., the exam began.

What I’m about to say has been covered in countless other posts, so I’ll be brief. The first machine I tackled was the BOF one. I had wondered how I would identify it until exam day, but don’t worry—they tell you which one it is. They also provide a Windows VM with the same software and a Python script to get started on the BOF.

After completing the BOF (which took two hours), I moved on to a 20-point machine (another two and a half hours). I couldn’t get a shell on the second 20-pointer, so I switched to the 10-point machine, which I solved in about half an hour (a great confidence boost). After hitting a wall with the second 20-pointer, I attempted the 25-point machine. At this point, I was about eight or nine hours into the exam and only 15 points away from passing. With so many thoughts racing through my mind, I couldn’t stop then. I remembered that **Metasploit** was allowed on one machine, tried the only exploit available for that 20-point machine, and got in. The privilege escalation was straightforward.

After 10 hours of exam time, I was fairly certain I had passed (more on the “fairly” part later). I spent two more hours trying to complete the last 25-pointer, but my brain was fried. I decided to end the exam, double-checking that I had all the screenshots needed for the report.

### The Day After

When I woke up the day after finishing the exam, everything felt slower. I knew I had given it my all the previous day. I had breakfast with my family, knowing I had 24 hours to submit the report (I had already checked for completeness). After showering and freshening up, I used their template to create the report.

Remember that “fairly certain” part? Now’s the time to explain. When you know you have all the screenshots and submitted the flags as instructed, you’re almost sure you’ve passed. But Offensive Security pushes you to the limit with strict report formatting requirements. Before submitting, you must ensure that all screenshots and commands are perfectly documented, with the file named and formatted exactly as specified.

I spent Sunday avoiding screens altogether. I was exhausted but happy because I knew how the exam had gone. On Monday mid-morning, I received the email saying I had passed.

### Conclusion

To wrap up this lengthy post, I’ll say that I’m glad to have had this experience with a happy ending. Looking back, I realize this certification is just the beginning of the journey. There’s still so much to learn. I have the foundation, but the best way to learn is by trying things yourself, and I’m sure that’s something no course can teach you—just you, facing something with a network connection.

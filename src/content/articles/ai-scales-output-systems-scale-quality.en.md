---
title: AI scales output. Systems scale quality.
date: 2026-04-25
readTime: 10 min read
excerpt: How a hidden process, a joke called “la pateada”, and a failed design system led to Blacklight — and why design systems matter even more in the age of AI.
coverImage: /ai-scales-output-systems-scale-quality.png
coverAlt: AI scales output. Systems scale quality.
published: true
---

There was a moment where things started to feel slightly off, even though, on paper, everything was going well.

We were shipping faster than ever. New features were going out constantly, sometimes daily, and the team was moving with a level of velocity that, from the outside, looked like progress.

And yet, when you stepped back and looked at the product as a whole, something didn’t quite hold together.

Each new screen felt just a bit different from the previous one. Spacing shifted. Shadows varied. Border radii weren’t consistent. Colors drifted just enough to make the whole experience feel fragmented.

It wasn’t broken.

But it wasn’t cohesive either.

And behind that, there was a process quietly forming — one that we never explicitly designed, but that nonetheless shaped how we worked.

&nbsp;


## The “pateada”

![The image that circulated around the team once a pateada was happening](/pateada.jpg "max-height=28rem")


Inside the team, we had a name for part of that process.

We called it “la pateada” — *the kick*.

There was also a bit of an inside joke behind it. My nickname is “Pato”, and in Spanish, *patear* means “to kick”. So “la pateada” was, in a way, *Pato stepping in at the end to fix things*.

It was funny at first. It even felt like a role.

But over time, it became something else entirely.

A feature would be built, shipped in a functional state, and then I would step in to clean it up — adjusting spacing, fixing hierarchy, aligning components, removing inconsistencies, bringing it closer to what it should have been from the beginning.

At first, it worked.

The product looked better after every “kick”.

But something subtle started happening.

&nbsp;

> What started as a joke slowly became part of the system.

&nbsp;

## When fixing becomes the system

The team adapted.

Not intentionally. Not explicitly. But naturally.

Features began to be built with the implicit assumption that they would be polished later. The “pateada” stopped being an exception and started becoming part of the workflow.

Without realizing it, we had introduced a hidden stage:

**build → ship → fix afterward**

And that came with consequences.

We were reworking the same things over and over again.  
I became a bottleneck.  
And more importantly, we were optimizing for speed in a way that degraded quality.

We were shipping fast.

But not shipping well.

And with AI entering the workflow, that problem doesn’t stay linear.

It compounds.

&nbsp;

> AI accelerates output, but it doesn’t create coherence.

&nbsp;

## The obvious solution (that wasn’t)

![Old Autonoma home made with Pond UI](/old-home.png "max-height=30rem")

So we did what most teams do.

We created a design system.

We called it *Pond UI*, and the idea was simple: take all the components we already had, organize them, and start reusing them in a more structured way.

And to be fair, it helped.

We gained some speed, some consistency, and a bit more structure.

But something still felt off.

Because Pond UI wasn’t really a system.

It was an archive.

&nbsp;

## You can’t build consistency from chaos

Every component we had came from a different moment. Different context, different intention, different people.

We weren’t designing a system.

We were grouping leftovers.

And that revealed a deeper problem.

&nbsp;

> You can’t build consistency from things that were never meant to be consistent.

&nbsp;

A real design system is not just a set of reusable components. It’s a shared language that encodes decisions, intentions, and constraints. It ensures that no matter who builds something, it still feels like it belongs.

It aligns design, engineering, and product.

And more importantly, it allows you to scale without losing quality.

That’s when something clicked.

&nbsp;

> A design system is not something you migrate into.  
> It’s something you design from the ground up.

&nbsp;

## A different product requires a different language

Around the same time, the product itself was changing.

Autonoma v0 felt familiar. Structured. Predictable. Something that could easily fit into a suite like Atlassian.

But what we were building next wasn’t that.

We were moving toward a system of agents — something more opinionated, more aggressive, more alive. A product that explores your codebase, surfaces things you didn’t explicitly ask for, and operates with a certain level of autonomy.

At that point, the gap wasn’t just visual.

It was conceptual.

So instead of iterating, we made a decision.

We reset.

&nbsp;

## The turn

![Blacklight preview](/blacklight-preview.png "max-height=30rem")

We changed everything.

Dark mode as the foundation.  
No more unnecessary shadows.  
No more endless debates about pixel-level details.  
A simpler, more cohesive set of primitives.  
New typography. New icons. A new identity.

This wasn’t about aesthetics.

It was about alignment.

&nbsp;

> The interface had to feel like the product we were building.

&nbsp;

## Designing in motion

The process wasn’t clean.

It didn’t come from a perfect Figma file or a predefined workflow. It emerged through conversations, iterations, and constant adjustment.

I spoke with each member of the team individually, presenting early ideas, collecting feedback, and refining direction with every iteration. Each version incorporated something new from the previous one.

The system evolved through dialogue.

Not prescription.

The tools reflected that same flexibility. Paper, Jitter, DaVinci Resolve, references from other products — whatever helped move the idea forward became part of the process.

There wasn’t a “correct” way.

Just iteration.

&nbsp;

## Blacklight

At some point, it needed a name.

Nacho mentioned the concept of a blacklight — a light that reveals what’s invisible to the naked eye.

That idea resonated immediately.

Because that’s exactly what the product does.

And what the system enables.

So we called it **Blacklight**.

&nbsp;

## Systems are not static

One of the biggest misconceptions about design systems is thinking they’re finished.

They’re not.

They evolve with the product.

![Agent Status GIF](/agent-status.gif "max-height=28rem")

A clear example of this was the Agent Status component.

It wasn’t part of the initial system, but it became necessary as we needed better visibility into what the agent was doing in real time.

Instead of existing outside the system, it was absorbed into it.

&nbsp;

> The system wasn’t dictating the product.  
> The product was shaping the system.

&nbsp;

## AI doesn’t solve design

AI changes how fast you can build.

But it doesn’t decide how things should look, feel, or behave.

Without a system, AI becomes a multiplier of inconsistency.

But with a system, everything changes.

You can generate UI within constraints.  
You can encode decisions in documentation.  
You can make those rules accessible to agents.  

&nbsp;

> AI doesn’t replace design.  
> It scales the decisions you’ve already made.

&nbsp;

## Writing it down

At some point, we wrote it all down.

Not just components, but principles, rules, and intentions — in a format that could be consumed not only by developers, but by agents as well.

The system stopped living in people.

And started living in the product.

&nbsp;

## Designing myself out of the process

And then something unexpected happened.

The team got better.

They started shipping with more quality from the beginning.

The “pateada” started to disappear.

&nbsp;

> I had, unintentionally, dug my own grave.

&nbsp;

Because the thing I used to do manually…

Was no longer needed.

And that’s the point.

A good system doesn’t make you faster.

It makes you unnecessary in the places you shouldn’t be needed.

&nbsp;

## Final thought

Design systems are often misunderstood as UI kits or component libraries.

But their real value lies elsewhere.

They encode decisions.  
They create alignment.  
They enable scale.

And in a world where AI is increasingly involved in how products are built, they become even more critical.

&nbsp;

> Because if you don’t design the system,  
> what you end up designing instead is debt.

Notes-Dhammika


# TODO
- [] Ap citations

# Potential further work

* Bv citations could all be checked for accuracy

# Citation formats

Snp is to verse number, e.g. Snp.234 is verse 234 in the PTS edition
Bv is to chapter and verse number, e.g. Bv2.34 is to chapter two, verse 34 (with slight errors)


# outstanding MINOR issues

## Nidd
Nidd.ii.304 is to https://suttacentral.net/cnd22/pli/ms#107.73

This may just need to be hard coded

## Bv
Bv.i.31 This is the only Bv citation in this format






# Misc Ap

## From email:
        In the list of abbreviations he gives Ap as Apadāna, ed. Mary E. Littey, PTS Oxford 2000. This is another book I am not very familiar with. On SC, it appears that there are citations for Tha-ap and Thi-ap There are only 13 Ap citations here, 3 in PED and none in DPPN. Shall we just skip these?


It'd be worth checking these. I notice it usually says something like:

    <span class='ref'>Thag-a.72</span> (<span class='ref'>Ap.v.45</span>)


So it seems to be treating Apadana as equivalent to commentary? Maybe the commentary is quoting the Apadana?

The Apadana was originally published in 1925, the same year as the PTS dict, so i'm not sure how they got the references, anyway it explains why there are so few.

Anyway, if you want to chase these up, you can, but it looks like we have no verse numbers in bilara-data/reference/tha-ap, so they would have to be checked by hand. Or else just leave them.

## from thread
Good news is that the PTS numbers do resemble what Ven. Dhammika is using. So in the dictionary he has this:

"word": "kurañjiya",
        "text": "<dl><dt><dfn>Kurañjiya</dfn></dt><dd><p>A type of plant 
<span class='ref'>Ap.448</span>.</p></dd></dl>"

It appears this is to pts-vp-pli2.448. So that means that what I should be trying to create is

<a class='ref' 
data-division='/sutta/tha-ap' 
data-reference='pts-vp-pli2.448' 
data-url='/en/walters'>Ap.ii.448</a>

Or should the front facing citation be Tha-ap.ii.448?
[EDIT: Ok, re-reading I can see that you want all front facing citations to be the SuttaCentral standard ones.]
Also, do you want this pointing to his translation, or to the Pali?
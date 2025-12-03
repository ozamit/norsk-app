#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import csv

# Data from user
data = """jeg	Jeg går en tur i dag.
du	Du finner løsningen ganske lett.
han	Han leser boka hver kveld.
hun	Hun lager middag til hele familien.
vi	Vi jobber sammen på prosjektet.
dere	Dere kommer alltid litt for sent.
de	De spiller fotball etter skolen.
mann	Mannen snakker høyt på møtet.
kvinne	Kvinnen skriver et langt brev.
gutt	Gutten løper raskt til bussen.
jente	Jenta synger fint i koret.
barn	Barn leker ute i hagen.
venn	Vennen hjelper meg med flytting.
nabo	Naboen klipper plenen hver søndag.
lærer	Læreren forklarer oppgaven veldig tydelig.
student	Studenten leser hele natten før prøven.
ungdom	Ungdom går ofte på kino sammen.
voksen	Voksne tar ansvar i vanskelige situasjoner.
eldre	Eldre trenger litt ekstra hjelp hjemme.
tenåring	Tenåringen vil helst være alene."""

# Split into lines and write to CSV
lines = data.strip().split('\n')

with open('contexts.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Ord', 'Setning'])
    
    for line in lines:
        parts = line.split('\t', 1)
        if len(parts) == 2:
            writer.writerow([parts[0].strip(), parts[1].strip()])

print(f"Created contexts.csv with {len(lines)} words")

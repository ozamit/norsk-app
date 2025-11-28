import csv
import os

input_file = 'raw_data.txt'
output_file = 'contexts.csv'

if not os.path.exists(input_file):
    print(f"Error: {input_file} not found. Please paste your data into this file first.")
    exit(1)

with open(input_file, 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

with open(output_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Ord', 'Setning'])
    
    count = 0
    for line in lines:
        # Try splitting by tab first
        parts = line.split('\t', 1)
        if len(parts) != 2:
            # Fallback: try splitting by first space if no tab (handling potential copy-paste formatting issues)
            # But be careful, sentences have spaces.
            # Let's assume tab-separated as requested.
            continue
            
        writer.writerow([parts[0].strip(), parts[1].strip()])
        count += 1

print(f"✅ Successfully converted {count} lines from {input_file} to {output_file}")

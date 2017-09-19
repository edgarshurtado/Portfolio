# Rename all *.txt to *.text
for f in images/*.png; do
mv -- "$f" "${f%.png}.jpg"
done

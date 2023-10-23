
new_file = open('C:/Users/SURYAWANSHI SACHIN/Desktop/Sentient/Development/Sentient Web/model/data/raw/new Sara Shaikh.txt','w',encoding = 'utf-8')


old_file = open('C:/Users/SURYAWANSHI SACHIN/Desktop/Sentient/Development/Sentient Web/model/data/raw/Sara Shaikh.txt','r',encoding='utf-8').readlines()
lines_present = set()

for i in old_file:
    if i not in lines_present:
        new_file.writelines(i)
        lines_present.add(i)

new_file.close()
# print(lines_present)

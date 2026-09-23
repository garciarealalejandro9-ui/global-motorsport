import json
import os

def generar_datos_f2():
    os.makedirs('data', exist_ok=True)
    
    # Generar las temporadas de 2017 a 2027
    for year in range(2017, 2028):
        datos_temporada = {
            "temporada": year,
            "rondas": [
                {
                    "round": 1,
                    "nombre": f"Ronda 1: Melbourne F2 Round",
                    "circuito": "Albert Park Circuit",
                    "fecha": f"{year}-03-29",
                    "resultados": [
                        {"pos": 1, "driver": "Piloto Ejemplo", "team": "Equipo F2", "points": 25}
                    ]
                }
            ]
        }
        
        # Guarda un archivo JSON independiente por cada año dentro de la carpeta data/
        ruta_archivo = f"data/f2_{year}.json"
        with open(ruta_archivo, 'w', encoding='utf-8') as f:
            json.dump(datos_temporada, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    generar_datos_f2()

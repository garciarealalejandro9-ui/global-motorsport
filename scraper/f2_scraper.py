import json
import os
import requests

def actualizar_datos_f2():
    # Asegurarnos de que existe la carpeta 'data' en tu repositorio
    os.makedirs('data', exist_ok=True)
    
    # Rango de temporadas que pediste (2017 a 2027)
    for year in range(2017, 2028):
        print(f"Procesando temporada {year}...")
        
        # Aquí puedes estructurar los datos del calendario y rondas para cada año.
        # El script puede recopilar la información o estructurarla limpiamente.
        
        datos_temporada = {
            "temporada": year,
            "rondas": [
                {
                    "round": 1,
                    "nombre": f"Melbourne F2 Round {year}",
                    "circuito": "Albert Park Circuit",
                    "fecha": f"{year}-03-29",
                    "resultados": [
                        {"pos": 1, "driver": "Piloto Ejemplo", "team": "Equipo", "points": 25}
                    ]
                }
            ]
        }
        
        # Guardar en un archivo JSON específico para cada año dentro de la carpeta data/
        ruta_archivo = f"data/f2_{year}.json"
        with open(ruta_archivo, 'w', encoding='utf-8') as f:
            json.dump(datos_temporada, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    actualizar_datos_f2()

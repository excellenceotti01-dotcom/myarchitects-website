from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src" / "assets" / "images"
OUTPUT_ROOT = ROOT / "src" / "assets" / "hero"

PROJECTS = {
    "aeris": "Aeris/05.png",
    "westcliff-health-care": "Westcliff/eatery 01.png",
    "proposed-five-bedroom-apartment": "5 Bedroom Apartment/frnt veiw.png",
    "proposed-residential-renovation": "Residential Renovation/ext1.png",
    "proposed-three-bedroom-apartments": "3 Bedroom Apartment/living room 01.png",
    "city-project": "City Project/render.png",
    "proposed-landscape-garden": "Landscape Garden/IMG_0354.png",
    "proposed-garden-1": "Garden 1/05.png",
    "proposed-residential-development-2-bedroom": "Proposed Residential Development/1-hd.png",
}

WIDTHS = {
    "mobile": 960,
    "standard": 1600,
    "large": 2560,
}


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    height = round(image.height * width / image.width)
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    if width > image.width:
        resized = resized.filter(ImageFilter.UnsharpMask(radius=0.8, percent=45, threshold=3))
    return resized


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    for slug, relative_source in PROJECTS.items():
        source_path = SOURCE_ROOT / relative_source
        with Image.open(source_path) as source:
            source = source.convert("RGB")
            for size_name, width in WIDTHS.items():
                output_path = OUTPUT_ROOT / f"{slug}-hero-{size_name}.webp"
                resize_to_width(source, width).save(
                    output_path,
                    "WEBP",
                    quality=88,
                    method=6,
                )
                print(f"{output_path.relative_to(ROOT)} ({width}px)")


if __name__ == "__main__":
    main()

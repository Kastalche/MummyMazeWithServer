
using UnityEngine;
using UnityEngine.Events;

public class Character : MonoBehaviour
{
    public int id { get; private set; }

    public Tile startPosition { get; set; }
    //  public Tile TargetPosition;
    public Tile currentPosition;

    public bool isBot;
    public bool isMummy;
}